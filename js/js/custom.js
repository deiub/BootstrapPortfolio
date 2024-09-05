const provinceSelector = document.getElementById('province');
    const citySelector = document.getElementById('city');

    generate_province();

    async function generate_province() {
      try {
        const url = "https://psgc.gitlab.io/api/provinces";
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const results = await response.json();
    
        let append = "";
        for (let x in results) {
          let row = results[x];
          let cell = "<option value='" + row.code + "'>" + row.name + "</option>";
          append = append + cell;
          provinceSelector.innerHTML = append;
        }

        // Add event listener to trigger city loading when province is selected
        provinceSelector.addEventListener('change', () => {
          const selectedProvinceCode = provinceSelector.value;
          if (selectedProvinceCode) {
            generate_cities(selectedProvinceCode);
          }
        });

      } catch (error) {
        console.error(`Fetch error: ${error.message}`);
      }
    }

    async function generate_cities(provinceCode) {
      try {
        const cityUrl = `https://psgc.gitlab.io/api/provinces/${provinceCode}/cities`;
        
        const response = await fetch(cityUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const results = await response.json();
    
        let append = "";
        for (let x in results) {
          let row = results[x];
          let cell = "<option>" + row.name + "</option>";
          append += cell;
        }
        citySelector.innerHTML = append; // Set innerHTML after the loop

      } catch (error) {
        console.error(`Fetch error: ${error.message}`);
      }
    }