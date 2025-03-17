const req = new XMLHttpRequest();
req.open('get', 'https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-principaux-diplomes-et-formations-prepares-etablissements-publics/records?limit=20&refine=etablissement_lib%3A%22Universit%C3%A9%20de%20Lille%22&refine=niveau_lib%3A%221%C3%A8re%20ann%C3%A9e%22&refine=diplome_rgp%3A%22Licence%22&refine=disciplines_selection%3A%22STAPS%22')
req.onreadystatechange = function() {
    if (req.readyState === 4 && req.status === 200) {
        const donnees = JSON.parse(req.responseText);
        console.log(donnees.results[0].effectif)
        const labels = [
            '2020-21',
            '2021-22',
            '2022-23'
            
        ];
        const data = {
            labels : labels,
            datasets: [{
                label : "nombre d'inscrit",
                backgroundColor: '#ED63C5',
                borderColor: '#ED63C5',
                data: [donnees.results[2].effectif, donnees.results[9].effectif, donnees.results[1].effectif ]
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
                        text: `Inscrits en STAPS de 2020-2021 à 2022-23`
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
req.send()