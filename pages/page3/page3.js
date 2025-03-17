const req = new XMLHttpRequest();
req.open('get', `https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-principaux-diplomes-et-formations-prepares-etablissements-publics/records?limit=20&refine=etablissement_lib%3A%22Universit%C3%A9%20Toulouse%20-%20Jean%20Jaur%C3%A8s%22&refine=annee_universitaire%3A%222022-23%22&refine=diplome_rgp%3A%22Licence%22&refine=sect_disciplinaire_lib%3A%22Math%C3%A9matiques%20appliqu%C3%A9es%20et%20sciences%20sociales%22`);
req.onreadystatechange = function () {
    if (req.readyState === 4 && req.status === 200) {
        const donnees = JSON.parse(req.responseText);
        const labels = [
            '1er année',
            '2eme année',
            '3eme année'

        ];
        const data = {
            labels: labels,
            datasets: [{
                label: "Femmes",
                backgroundColor: 'rgb(0, 199, 193)',
                borderColor: 'rgb(0, 199, 193)',
                data: [donnees.results[0].femmes, donnees.results[1].femmes, donnees.results[2].femmes]
            },
            {
                label: 'Hommes',
                backgroundColor: 'rgb(200, 0, 0)',
                borderColor: 'rgb(200, 0, 0)',
                data: [donnees.results[0].hommes, donnees.results[1].hommes, donnees.results[2].hommes]
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
                        text: `Inscrits en Mathématiques appliquées et sciences sociales à Université Toulouse - Jean Jaurès durant l'année 2022-2023`
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




