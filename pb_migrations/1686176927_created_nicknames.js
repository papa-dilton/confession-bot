migrate((db) => {
  const collection = new Collection({
    "id": "ifkfnp66s7u0ff4",
    "created": "2023-06-07 22:28:47.313Z",
    "updated": "2023-06-07 22:28:47.313Z",
    "name": "nicknames",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "d68bnrns",
        "name": "field",
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
        "id": "jovxwhmh",
        "name": "guild_id",
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
        "id": "bgxxfazl",
        "name": "nick",
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
  const collection = dao.findCollectionByNameOrId("ifkfnp66s7u0ff4");

  return dao.deleteCollection(collection);
})
