fetch('characterData.json')
  .then(response => response.json())
  .then(characterData => {
    const searchInput = document.getElementById('searchInput');
    const resultDiv = document.getElementById('result');

    searchInput.addEventListener('input', function() {
      const searchTerm = searchInput.value.toLowerCase();
      resultDiv.innerHTML = '';

      if (searchTerm.length > 0) {
        const filteredCharacters = characterData.filter(character => {
          const characterName = character.name.toLowerCase();
          return characterName.includes(searchTerm) || searchTerm.split(" ").every(word => characterName.includes(word));
        });

        // Sắp xếp kết quả theo độ khớp
        filteredCharacters.sort((a, b) => {
          const aName = a.name.toLowerCase();
          const bName = b.name.toLowerCase();

          const aMatch = calculateMatchScore(aName, searchTerm);
          const bMatch = calculateMatchScore(bName, searchTerm);

          return bMatch - aMatch; // Sắp xếp giảm dần theo điểm khớp
        });


        if (filteredCharacters.length > 0) {
          filteredCharacters.forEach(character => {
            const characterDiv = document.createElement('div');
            characterDiv.classList.add('character');
            characterDiv.innerHTML = `
              <h2>${character.name}</h2>
              <p>Độ hiếm: ${character.rarity}</p>
              <p>Vai trò: ${character.role}</p>
              <p>Gợi ý: ${character.roll_advice}</p>
              <p>Thông tin: ${character.info}</p>
            `;
            resultDiv.appendChild(characterDiv);
          });
        } else {
          resultDiv.innerHTML = "<p>Không tìm thấy nhân vật.</p>";
        }
      }
    });

    // Hàm tính điểm khớp
    function calculateMatchScore(characterName, searchTerm) {
      let score = 0;

      if (characterName === searchTerm) {
        return 100; // Khớp hoàn hảo
      }

      if (characterName.startsWith(searchTerm)) {
        score += 75; // Khớp ở đầu
      }

      if (characterName.includes(searchTerm)) {
        score += 50; // Khớp một phần
      }

      const searchTermWords = searchTerm.split(" ");
      const characterNameWords = characterName.split(" ");

      for (const searchWord of searchTermWords) {
        for (const characterWord of characterNameWords) {
          if (characterWord.includes(searchWord)) {
            score += 25; // Khớp từ
          }
        }
      }

      return score;
    }
  });
