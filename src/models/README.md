For each model, make sure to load this plugin before model creation.

ex:
`SchemaName.plugin(require('@/utils/store/leanObjectIdToString'))`

This plugin will serialize all `_id` fields when performing a `.lean()` query. Basically, `_id` is an ObjectId, so this plugin will convert it to a string.
