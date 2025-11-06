function increaseSalary(salaries, percentage) {
    if (!Array.isArray(salaries)) {
        throw new Error("Primul parametru trebuie să fie un array!");
    }

    if (typeof percentage !== "number") {
        throw new Error("Al doilea parametru trebuie să fie un număr!");
    }

    return salaries.map(salary => {
        if (typeof salary !== "number") {
            throw new Error("Toate valorile din array trebuie să fie numere!");
        }
        return salary + (salary * percentage / 100);
    });
}

try {
    const oldSalaries = [2000, 2500, 3000];
    const newSalaries = increaseSalary(oldSalaries, 10);
    console.log("Salarii actualizate:", newSalaries);

    
    increaseSalary("nu e array", 10);
} catch (error) {
    console.error("Eroare:", error.message);
}
