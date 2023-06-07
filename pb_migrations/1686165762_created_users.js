migrate((db) => {
  const collection = new Collection({
    "id": "ukgw65pvbp33yjp",
    "created": "2023-06-07 19:22:42.808Z",
    "updated": "2023-06-07 19:22:42.808Z",
    "name": "users",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "eoeauidw",
        "name": "discord_id",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "vj1inwjg",
        "name": "usernames",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
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
  const collection = dao.findCollectionByNameOrId("ukgw65pvbp33yjp");

  return dao.deleteCollection(collection);
})
