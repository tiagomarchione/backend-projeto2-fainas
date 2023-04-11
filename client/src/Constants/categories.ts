export const categories = [
    {
        name: "Trabalho",
        value: "Trabalho",
        color: "red"
    },
    {
        name: "Escola",
        value: "Escola",
        color: "green"
    },
    {
        name: "Viagem",
        value: "Viagem",
        color: "blue"
    },
    {
        name: "Casa",
        value: "Casa",
        color: "gray"
    },
    {
        name: "Saúde",
        value: "Saúde",
        color: "gold"
    },
    {
        name: "Outros",
        value: "Outros",
        color: "blueviolet"
    }
];

export const getColorByValue = (value: string): string => {
    const founded = categories.find((category) => category.value === value)
    return founded?.color || "rgb(226, 232, 240)"  
}