fetch('characterData.json')
    .then(response => response.json())
    .then(characterData => {
        const searchInput = document.getElementById('searchInput');
        const resultDiv = document.getElementById('result');

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
                        characterNameForImage = characterNameForImage.replace(/ \(/g, "_").replace(/\)/g, "");

                        const remoteImageUrl = `https://blue-utils.me/img/common/sd/${characterNameForImage}.png`;
                        const localImageUrl = `images/${characterNameForImage}.png`;

                        const imgElement = document.createElement('img');
                        imgElement.alt = character.name;

                        const setImage = (url) => {
                            imgElement.src = url;
                        };

                        // Ưu tiên link, kiểm tra lỗi trước
                        fetch(remoteImageUrl)
                            .then(response => {
                                if (response.ok) {
                                    setImage(remoteImageUrl);
                                } else {
                                    // Link lỗi, thử ảnh cục bộ
                                    fetch(localImageUrl)
                                        .then(localResponse => {
                                            if (localResponse.ok) {
                                                setImage(localImageUrl);
                                            } else {
                                                setImage('placeholder.png');
                                            }
                                        })
                                        .catch(() => setImage('placeholder.png'));
                                }
                            })
                            .catch(() => {
                                // Lỗi khi fetch link, thử ảnh cục bộ
                                fetch(localImageUrl)
                                    .then(localResponse => {
                                        if (localResponse.ok) {
                                            setImage(localImageUrl);
                                        } else {
                                            setImage('placeholder.png');
                                        }
                                    })
                                    .catch(() => setImage('placeholder.png'));
                            });

                        characterDiv.innerHTML = `
                            <div class="info">
                                <h2>${character.name}</h2>
                                <p>Độ hiếm: ${character.rarity}</p>
                                <p>Vai trò: ${character.role}</p>
                                <p>Gợi ý: ${character.roll_advice}</p>
                                <p>Thông tin: ${character.info}</p>
                            </div>
                            <div class="image">
                                
                            </div>
                        `;
                        characterDiv.querySelector('.image').appendChild(imgElement);
                        resultDiv.appendChild(characterDiv);
                    });
                } else {
                    resultDiv.innerHTML = "<p>Không tìm thấy học sinh này ≧ ﹏ ≦</p>";
                }
            }
        });
    });
