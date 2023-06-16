export const colorthemes = {
  primary: {
    100: "#f9e6ff",
    200: "#d165db",
    300: "#eec0fc",
    400: "#e4abf5",
    500: "#dd94f2",
    600: "#d87cf2",
    700: "#fa75f5",
    800: "#f556ef",
    900: "#ed45e7",
    1000: "#6b0267",
  },

  secondary : {
    0: "#ffffff",
    10: "#f6f6f6",
    50: "#f0f0f0",
    100: "#e0e0e0",
    200: "#c2c2c2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#4d4d4d",
    700: "#242323",
    800: "#1a1a1a",
    900: "#0a0a0a",
    1000: "#000000",
  },
  
};

export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
    
            primary: {
              dark: colorthemes.primary[200],
              main: colorthemes.primary[1000],
              light: colorthemes.primary[1000],
              mid:colorthemes.primary[1000],
            },
            neutral: {
              dark: colorthemes.secondary[200],
              main: colorthemes.secondary[200],
              mediumMain: colorthemes.secondary[300],
              medium: colorthemes.secondary[100],
              light: colorthemes.secondary[500],
            },
            background: {
              default: colorthemes.secondary[900],
              alt: colorthemes.secondary[700],
            },
          }
        : {
  
            primary: {
              dark: colorthemes.primary[600],
              main: colorthemes.primary[200],
              light: colorthemes.primary[10],
              mid:colorthemes.primary[600],
            },
            neutral: {
              dark: colorthemes.secondary[700],
              main: colorthemes.secondary[500],
              mediumMain: colorthemes.secondary[400],
              medium: colorthemes.secondary[700],
              light: colorthemes.secondary[100],
            },
            background: {
              default: colorthemes.secondary[100],
              alt: colorthemes.secondary[50],
            },
          }),
    },
    typography: {
      fontFamily: ["Solway", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Solway", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Solway", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Solway", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Solway", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Solway", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Solway", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};