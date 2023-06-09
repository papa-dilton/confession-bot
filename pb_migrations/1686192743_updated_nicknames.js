migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ifkfnp66s7u0ff4")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d68bnrns",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ifkfnp66s7u0ff4")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
