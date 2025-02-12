fetch('characterData.json')
    .then(response => response.json())
    .then(characterData => {
        const searchInput = document.getElementById('searchInput');
        const resultDiv = document.getElementById('result');

        function displayAllCharacters() {
            resultDiv.innerHTML = '';
            characterData.sort((a, b) => {
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase(), undefined, { sensitivity: 'base' });
            });
            characterData.forEach(character => {
                const characterDiv = document.createElement('div');
                characterDiv.classList.add('character');

                let characterNameForImage = character.name.toLowerCase();


                if (characterNameForImage.includes("hot spring")) {
                    characterNameForImage = characterNameForImage.replace("hot spring", "onsen");
                }


                if (characterNameForImage.includes("track")) {
                    characterNameForImage = characterNameForImage.replace("track", "gym");
                }


                if (characterNameForImage.includes("cheer squad")) {
                    characterNameForImage = characterNameForImage.replace("cheer squad", "oendan");
                }


                characterNameForImage = characterNameForImage.replace(/ \(/g, "_").replace(/\)/g, "");

                const imageUrl = `https://blue-utils.me/img/common/sd/${characterNameForImage}.png`;

                characterDiv.innerHTML = `
                    <div class="info">
                        <h2>${character.name}</h2>
                        <p>Độ hiếm: ${character.rarity}</p>
                        <p>Vai trò: ${character.role}</p>
                        <p>Gợi ý: ${character.roll_advice}</p>
                        <p>Thông tin: ${character.info}</p>
                    </div>
                    <div class="image">
                        <img src="${imageUrl}" alt="${character.name}" onerror="this.src='placeholder.png'">
                    </div>
                `;

                resultDiv.appendChild(characterDiv);
            });
        }

        searchInput.addEventListener('input', function () {
            const searchTerm = searchInput.value.toLowerCase();
            resultDiv.innerHTML = '';

            if (searchTerm.length > 0) {
                const filteredCharacters = characterData.filter(character => {
                    const characterName = character.name.toLowerCase();
                    return characterName.includes(searchTerm) || searchTerm.split(" ").every(word => characterName.includes(word));
                });

                filteredCharacters.sort((a, b) => {
                    return a.name.toLowerCase().localeCompare(b.name.toLowerCase(), undefined, { sensitivity: 'base' });
                });

                if (filteredCharacters.length > 0) {
                    filteredCharacters.forEach(character => {
                        const characterDiv = document.createElement('div');
                        characterDiv.classList.add('character');

                        let characterNameForImage = character.name.toLowerCase();


                        if (characterNameForImage.includes("hot spring")) {
                            characterNameForImage = characterNameForImage.replace("hot spring", "onsen");
                        }


                        if (characterNameForImage.includes("track")) {
                            characterNameForImage = characterNameForImage.replace("track", "gym");
                        }


                        if (characterNameForImage.includes("cheer squad")) {
                            characterNameForImage = characterNameForImage.replace("cheer squad", "oendan");
                        }

                        characterNameForImage = characterNameForImage.replace(/ \(/g, "_").replace(/\)/g, "");

                        const imageUrl = `https://blue-utils.me/img/common/sd/${characterNameForImage}.png`;

                        characterDiv.innerHTML = `
                            <div class="info">
                                <h2>${character.name}</h2>
                                <p>Độ hiếm: ${character.rarity}</p>
                                <p>Vai trò: ${character.role}</p>
                                <p>Gợi ý: ${character.roll_advice}</p>
                                <p>Thông tin: ${character.info}</p>
                            </div>
                            <div class="image">
                                <img src="${imageUrl}" alt="${character.name}" onerror="this.src='placeholder.png'">
                            </div>
                        `;

                        resultDiv.appendChild(characterDiv);
                    });
                } else {
                    resultDiv.innerHTML = "<p>Không tìm thấy học sinh này ≧ ﹏ ≦</p>";
                }
            } else {
                displayAllCharacters();
            }
        });

        displayAllCharacters();
    });
