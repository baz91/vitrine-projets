const FOCUSABLE_SELECTOR = `
button:not([disabled]),
a[href],
input:not([disabled]),
select:not([disabled]),
textarea:not([disabled]),
[tabindex]:not([tabindex="-1"])
`;

let lastInputMethod = "mouse";
let activeTrapRoot = null;
let lastFocusedElement = null;

/* Détection globale */
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab" || e.key === "ArrowUp" || e.key === "ArrowDown") {
    lastInputMethod = "keyboard";
  }
});

document.addEventListener("mousedown", () => {
  lastInputMethod = "mouse";
});

document.addEventListener("touchstart", () => {
  lastInputMethod = "touch";
});

function isKeyboard() {
  return lastInputMethod === "keyboard";
}

function getFocusableElements(root = document) {
  return [...root.querySelectorAll(FOCUSABLE_SELECTOR)].filter(
    (el) => !el.hasAttribute("inert") && el.offsetParent !== null,
  );
}

function enableFocusTrap(root) {
  activeTrapRoot = root;
  lastFocusedElement = document.activeElement;

  const focusables = getFocusableElements(root);
  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  function handleTab(e) {
    if (e.key !== "Tab") return;

    if (!focusables.length) return;

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }
  }

  function blockOutsideFocus(e) {
    if (!root.contains(e.target)) {
      e.stopPropagation();
      e.preventDefault();
      first?.focus();
    }
  }

  document.addEventListener("keydown", handleTab, true);
  document.addEventListener("focusin", blockOutsideFocus, true);

  // expose cleanup
  activeTrapRoot._focusTrapCleanup = () => {
    document.removeEventListener("keydown", handleTab, true);
    document.removeEventListener("focusin", blockOutsideFocus, true);
  };
}

function getFirstFocusable() {
  return [...document.querySelectorAll(FOCUSABLE_SELECTOR)].find(
    (el) => !el.hasAttribute("inert") && el.offsetParent !== null,
  );
}

function disableFocusTrap() {
  if (activeTrapRoot?._focusTrapCleanup) {
    activeTrapRoot._focusTrapCleanup();
  }

  activeTrapRoot = null;

  // restore focus
  requestAnimationFrame(() => {
    lastFocusedElement?.focus?.();
    lastFocusedElement = null;
  });
}

export const focusService = {
  /**
   * Focus premier élément interactif
   * @param {Object} options
   * @param {boolean} options.force ignore detection clavier/souris
   */
  focusFirstInteractive({ force = false } = {}) {
    if (!force && !isKeyboard()) return;

    requestAnimationFrame(() => {
      const el = getFirstFocusable();
      el?.focus();
    });
  },

  /**
   * Version safe pour modales / transitions UI
   */
  safeFocusFirst() {
    this.focusFirstInteractive({ force: false });
  },

  /**
   * Version forcée (ex: debug, onboarding, UX contrôlée)
   */
  forceFocusFirst() {
    this.focusFirstInteractive({ force: true });
  },

  isKeyboard() {
    return isKeyboard();
  },

  enableFocusTrap,
  disableFocusTrap,
};
