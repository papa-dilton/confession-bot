migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nqlpggxjd20k1p5")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wnwcdc5p",
    "name": "guild_id",
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

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
