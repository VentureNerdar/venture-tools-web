import type { ConfigProviderProps } from 'naive-ui'

// const darkBg = "#17171B"
const darkBg = "#021526"
// const darkBg2 = "#1B1C23"
const darkBg2 = "#0a233d"
const darkBg3 = '#0c3156'
//E2E2B6 < yellowish white
// 0a233d darker blue

export const NaiveThemeOverrides = {
  darkTheme: {
    common: {
      fontFamily: "'Exo2-Regular', sans-serif",
      fontSize: "14px",
      primaryColor: "#17badf",
      primaryColorHover: "#4acbf9",
      primaryColorPressed: "#008fc4",
      primaryColorSuppl: "#0085b6",

      bodyColor: darkBg,
      baseColor: darkBg,
      tableColor: darkBg2,
      cardColor: darkBg2,
      borderRadius: '4px',
      modalColor: darkBg2,
      scrollbarColor: 'rgba(255, 255, 255, 0.1)',
      scrollbarWidth: '8px',
    },

    Notification: {
      color: darkBg2
    },

    Select: {
      peers: {
        InternalSelectMenu: {
          color: darkBg3,
        },
      },
      common: {
        baseColor: darkBg3,
      },
    },

    Tooltip: {
      color: darkBg3,
    },

    Popover: {
      color: darkBg3,
    },

  } as ConfigProviderProps['themeOverrides'],
}