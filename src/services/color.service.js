export const extractColorsFromImage = (imageUrl) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = 50;
      canvas.height = 50;

      ctx.drawImage(img, 0, 0, 50, 50);

      const data = ctx.getImageData(0, 0, 50, 50).data;

      let r = 0,
        g = 0,
        b = 0,
        count = 0;

      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
      }

      r = Math.floor(r / count);
      g = Math.floor(g / count);
      b = Math.floor(b / count);

      const primary = `rgb(${r}, ${g}, ${b})`;

      // secondaire = version assombrie
      const secondary = `rgb(${r * 0.2}, ${g * 0.2}, ${b * 0.2})`;

      resolve({ primary, secondary });
    };

    img.onerror = () => {
      resolve({
        primary: "white",
        secondary: "black",
      });
    };
  });
};
