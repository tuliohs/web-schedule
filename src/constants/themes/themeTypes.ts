export type TColor = "teal" | "gray" | "red" | "orange" | "yellow" | "green" | "teal" | "blue" | "indigo" | "purple" | "pink"

export type TTheme = {
    color?: TColor
    grau?: "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900",
    fontColor?: "white" | "black" | "gray-200" | "gray-600",
    fontSize?: "55" | "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl",
}

export const defaultTheme: TTheme = { color: "teal", grau: "500", fontColor: "black", fontSize: "sm" }