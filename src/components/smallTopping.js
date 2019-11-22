// import React from 'react';
// function list(files) {
//   const label = file =>
//     `'${file.name}' of size '${file.size}' and type '${file.type}'`;
//   return files.map(file => <li key={file.name}>{label(file)}</li>);
// }
// const SmallTopping = ({ files }) => {
//   return files.length === 0 ? (
//     <div>Nothing to display</div>
//   ) : (
//     <div>{list(files)}</div>
//   );
// };
// export default SmallTopping;

// import React from 'react';
// import ItemTypes from './ItemTypes';
// import { DragSource } from 'react-dnd';

// const Box = ({ name, isDragging, connectDragSource }) => {
//   const opacity = isDragging ? 0.4 : 1;
//   return (
//     <div ref={connectDragSource} style={{ ...style, opacity }}>
//       {key}
//     </div>
//   );
// };
// export default DragSource(
//   ItemTypes.BOX,
//   {
//     beginDrag: props => ({ key: props.key }),
//     endDrag(props, monitor) {
//       const item = monitor.getItem();
//       const dropResult = monitor.getDropResult();
//       if (dropResult) {
//         <div></div>;
//       }
//     },
//   },
//   (connect, monitor) => ({
//     connectDragSource: connect.dragSource(),
//     isDragging: monitor.isDragging(),
//   }),
// )(Box);
