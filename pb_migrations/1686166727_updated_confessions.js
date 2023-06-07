migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nqlpggxjd20k1p5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9c34ovnz",
    "name": "reports",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nqlpggxjd20k1p5")

  // remove
  collection.schema.removeField("9c34ovnz")

  return dao.saveCollection(collection)
})
