migrate((db) => {
  const collection = new Collection({
    "id": "nqlpggxjd20k1p5",
    "created": "2023-06-07 19:25:30.884Z",
    "updated": "2023-06-07 19:25:30.884Z",
    "name": "confessions",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "7lu5oann",
        "name": "user_id",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "ukgw65pvbp33yjp",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "bm7geqjv",
        "name": "msg_id",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "wnwcdc5p",
        "name": "server_id",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("nqlpggxjd20k1p5");

  return dao.deleteCollection(collection);
})
