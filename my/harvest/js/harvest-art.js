const harvestWheat = `
    <img
        class="harvest-plant harvest-wheat"
        src="./assets/harvest-wheat.svg"
        alt=""
    >
`;

const harvestLeaf = `
    <img
        class="harvest-plant harvest-leaf"
        src="./assets/harvest-leaf.svg"
        alt=""
    >
`;

const harvestTree = `
    <img
        class="harvest-plan harvest-tree"
        src="./assets/harvest-tree.svg"
        alt=""
    >
`;

const harvestPlants = {
    wheat: harvestWheat,
    leaf: harvestLeaf,
    tree: harvestTree,
};

function renderHarvestArt(container, selectedPlants) {
    const plantNames = selectedPlants
        ? selectedPlants.split(",").map((name) => name.trim())
        : ["wheat", "leaf", "tree"];

    container.innerHTML = plantNames.map((name) => harvestPlants[name]).filter(Boolean).join("");
}

document.querySelectorAll("[data-harvest-art]").forEach((container) => {
    renderHarvestArt(container, container.dataset.harvestArt);
});

