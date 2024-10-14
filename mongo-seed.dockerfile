FROM mongo

COPY mongo-seed.json /mongo-seed.json

CMD mongoimport --host db --db luizalabsdb --collection Order --type json --file /mongo-seed.json --jsonArray