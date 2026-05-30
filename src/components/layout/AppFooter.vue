<template>
  <v-footer class="footer">

    <v-container class="footer-container">

      <v-row
        class="footer-row"
        align="start"
        justify="space-between"
      >

        <!-- ENTREPRISE -->
        <v-col
          cols="12"
          md="4"
          class="footer-col"
        >
          <h3 class="footer-title">
            Studio Projets
          </h3>

          <p class="footer-text">
            Création de projets architecturaux et design sur mesure.
          </p>
        </v-col>

        <!-- CONTACT -->
        <v-col
          cols="12"
          md="4"
          class="footer-col"
        >
          <h3 class="footer-title">
            Contact
          </h3>

          <p class="footer-text">
            📍 Paris, France<br />
            📞 +33 6 00 00 00 00<br />
            ✉️ contact@studioprojets.com
          </p>
        </v-col>

        <!-- SOCIALS -->
        <v-col
          cols="12"
          md="4"
          class="footer-col socials-col"
        >
          <h3 class="footer-title">
            Suivez-nous
          </h3>

          <div class="socials">
            <v-btn
              icon="mdi-instagram"
              variant="text"
              href="#"
            />

            <v-btn
              icon="mdi-linkedin"
              variant="text"
              href="#"
            />

            <v-btn
              icon="mdi-facebook"
              variant="text"
              href="#"
            />
          </div>
        </v-col>

      </v-row>

      <v-divider class="divider" />

      <div class="copyright">
        © {{ new Date().getFullYear() }}
        Studio Projets — Tous droits réservés
      </div>

    </v-container>

  </v-footer>
</template>

<style scoped>
.footer {
  background-color: var(--color-secondary) !important;
  color: var(--color-primary) !important;

  padding-top: 80px;
  padding-bottom: 40px;

  transition:
    background-color 0.6s ease,
    color 0.6s ease;
}

/* ========================= */
/* CONTAINER */
/* ========================= */

.footer-container {
  max-width: 1280px;

  margin: 0 auto;

  padding-inline: clamp(20px, 5vw, 60px);
}

/* ========================= */
/* ROW */
/* ========================= */

.footer-row {
  row-gap: 40px;
}

/* ========================= */
/* COLUMNS */
/* ========================= */

.footer-col {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

/* ========================= */
/* TYPOGRAPHY */
/* ========================= */

.footer-title {
  font-size: 14px;
  font-weight: 600;

  margin-bottom: 12px;

  letter-spacing: 0.5px;
}

.footer-text {
  font-size: 13px;
  line-height: 1.7;

  opacity: 0.85;
}

/* ========================= */
/* SOCIALS */
/* ========================= */

.socials-col {
  align-items: flex-start;
}

.socials {
  display: flex;
  gap: 10px;

  margin-top: 6px;
}

/* ========================= */
/* DIVIDER */
/* ========================= */

.divider {
  margin-top: 50px;
  margin-bottom: 20px;

  opacity: 0.2;
}

/* ========================= */
/* COPYRIGHT */
/* ========================= */

.copyright {
  text-align: center;

  font-size: 12px;

  opacity: 0.65;
}
</style>