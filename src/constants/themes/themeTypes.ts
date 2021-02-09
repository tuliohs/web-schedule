export type TColor = "teal" | "gray" | "red" | "orange" | "yellow" | "green" | "teal" | "blue" | "indigo" | "purple" | "pink"

export type TTheme = {
    color?: TColor
    grau?: "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900",
    fontColor?: "white" | "black" | "gray-200" | "gray-500" | "gray-800",
    fontSize?: "55" | "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl",
}

export const defaultTheme: TTheme = { color: "gray", grau: "400", fontColor: "gray-800", fontSize: "sm" }

export enum EModernColors {
    black = "#000",
    white = "#fff",
    red = "#f32827",
    purple = "#a42ce9",
    blue = "#2d7fea",
    yellow = "#f4f73e",
    pink = "#eb30c1",
    gold = "#ffd500",
    aqua = "#2febd2",
    gray = "#282c35",
} 