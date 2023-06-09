migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ukgw65pvbp33yjp")

  // remove
  collection.schema.removeField("vj1inwjg")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ukgw65pvbp33yjp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vj1inwjg",
    "name": "usernames",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
