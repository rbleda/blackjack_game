import React from 'react';

interface MoneyPileProps {
    amount: number;
}

const MoneyPile: React.FC<MoneyPileProps> = (props: MoneyPileProps) => {
    // Define a map of chip values to colors
    const stackColorMap = new Map<number, string>([
        [1000, "red"],
        [500, "blue"],
        [100, "green"],
        [10, "white"],
    ]);

    // Calculate the number of chips for each value
    const stackMap = new Map<number, number>();
    let remainingAmount = props.amount;

    Array.from(stackColorMap.keys()).forEach((chipValue) => {
        const stacks = Math.floor(remainingAmount / chipValue);
        stackMap.set(chipValue, stacks);
        remainingAmount -= stacks * chipValue;
    });

    // Render a stack of chips
    const drawStack = (chipValue: number, chipColor: string, count: number) => {
        return (
            <div key={chipValue} style={{ marginBottom: "10px" }}>
                <div
                    style={{
                        width: "50px",
                        height: "20px",
                        backgroundColor: chipColor,
                        display: "inline-block",
                        textAlign: "center",
                        lineHeight: "20px",
                        color: "white",
                        fontWeight: "bold",
                        marginRight: "5px",
                    }}
                >
                    {chipValue}
                </div>
                <span>x {count}</span>
            </div>
        );
    };

    return (
        <div>
            {Array.from(stackMap.entries()).map(([chipValue, count]) => {
                const chipColor = stackColorMap.get(chipValue);
                if (chipColor && count > 0) {
                    return drawStack(chipValue, chipColor, count);
                }
                return null; // Skip values with no chips
            })}
        </div>
    );
};

export default MoneyPile;