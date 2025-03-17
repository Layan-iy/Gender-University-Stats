const req = new XMLHttpRequest();
req.open('get', `https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-principaux-diplomes-et-formations-prepares-etablissements-publics/records?limit=20&refine=etablissement_lib%3A%22Aix-Marseille%20Universit%C3%A9%22&refine=diplome_rgp%3A%22Licence%22&refine=annee_universitaire%3A%222017-18%22`);
req.onreadystatechange = function() {
    if (req.readyState === 4 && req.status === 200) {
        const donnees = JSON.parse(req.responseText);
        const labels = [
            '1er année',
            '2eme année',
            '3eme année'
            
        ];
        const data = {
            labels : labels,
            datasets: [{
                label : "Femmes",
                backgroundColor: '#ED63C5',
                borderColor: '#ED63C5',
                data: [donnees.results[2].femmes, donnees.results[1].femmes,donnees.results[0].femmes]
            },
            {
                label: 'Hommes',
                backgroundColor: '#439DE9',
                borderColor:'#439DE9',
                data: [donnees.results[2].hommes,donnees.results[1].hommes,donnees.results[0].hommes]
            }

        ]

        }
            const config = {
        type: 'line',
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: `Inscrits en Science pour l'ingénieur à Aix-Marseille université durant 2017-18`
                }
            }
         
        }
        }
            new Chart(
            document.querySelector("#graph1"),
            config
        );


        }
    }
req.send();




