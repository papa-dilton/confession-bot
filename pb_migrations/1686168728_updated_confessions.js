migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nqlpggxjd20k1p5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ynqupf5i",
    "name": "channel_id",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nqlpggxjd20k1p5")

  // remove
  collection.schema.removeField("ynqupf5i")

  return dao.saveCollection(collection)
})
