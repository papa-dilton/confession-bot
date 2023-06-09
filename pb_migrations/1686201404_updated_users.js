migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ukgw65pvbp33yjp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eocznmwo",
    "name": "mute_until",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ukgw65pvbp33yjp")

  // remove
  collection.schema.removeField("eocznmwo")

  return dao.saveCollection(collection)
})
