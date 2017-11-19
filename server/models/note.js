import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  task: { type: 'String', required: true },
  id: { type: 'String', required: true, unique: true }
});

// noteSchema.pre('remove', next => {
//   this.model('Lane').update(
//     {},
//     { "$pull": { "notes": this._id }},
//     { "multi": true},
//     next
//   );
// });
export default mongoose.model('Note', noteSchema);
