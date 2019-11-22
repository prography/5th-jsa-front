// import React, { useState } from 'react';

// const width = 300;
// const height = 300;
// const borderStyle = '2px dotted #000';

// const dropAreaImageStyle = {
//   width,
//   height,
// };

// const dropAreaStyle = {
//   ...dropAreaImageStyle,
//   border: borderStyle,
// };

// const DropArea = () => {
//   const [data, setData] = useState(false);
//   const [err, setErr] = useState(false);
//   const onDrop = e => {
//     e.preventDefault();
//     const {
//       dataTransfer: { files },
//     } = e;
//     const { length } = files;
//     const reader = new FileReader();
//     if (length === 0) {
//       return false;
//     }
//     const fileTypes = [
//       'multipart/form-data',
//       'www-url-form-encoded',
//       'text/html',
//       'img/png',
//     ];
//     console.log({ files });

//     const { size, type } = files[0];
//     setData(false);

//     reader.readAsDataURL(files[0]);
//     reader.onload = loadEvt => {
//       setData(loadEvt.target.result);
//     };
//   };
//   const onDragStart = e => {
//     e.preventDefault();
//   };
//   const onDragOver = e => {
//     e.preventDefault();
//   };
//   return (
//     <div>
//       {err && <p>{err}</p>}
//       <div
//         style={dropAreaStyle}
//         onDrop={e => onDrop(e)}
//         onDragOver={e => onDragOver(e)}
//       >
//         {data && <img style={dropAreaImageStyle} src={data} />}
//       </div>
//       <div className="button-wrapper">
//         {data && <button onClick={() => setData(false)}>Remove</button>}
//       </div>
//     </div>
//   );
// };
// export default DropArea;
// const Dough = ({ canDrop, isOver, connectDropTarget }) => {
//   const isActive = canDrop && isOver;
//   let width = '75%'
//   let height = '58%'
//   if (isActive) {
// ​    width = '80%',
// ​    height = '62%'
//   }
//   return (
//     <div className="topping-big-container">
// ​      <img
// ​        src={dough}
// ​        className="dough"
// ​        alt="dough"
// ​        style={{ ...doughStyle, width, height }}
// ​      />
//       <div className="topping-big" ref={connectDropTarget}></div>
//       <div>
// ​        {isActive ? (
//           <div style={announceStyle}>Right there !</div>
// ​        ) : (
//           <div style={announceStyle}>Put your topping on your dough</div>
// ​        )}
// ​      </div>
// ​    </div>
//   );
// };

// export default DropTarget(
//   ItemTypes.BOX,
//   {
// ​    drop(props, monitor) {
// ​      if (props.onDrop) {
// ​        props.onDrop(props, monitor);
// ​      }
// ​    },
//   },
//   (connect, monitor) => ({
// ​    connectDropTarget: connect.dropTarget(),
// ​    isOver: monitor.isOver(),
// ​    canDrop: monitor.canDrop(),
//   }),
// )(Dough);

// const doughStyle = {
//   position: 'absolute',
//   right: '0',
//   bottom: '0',
//   zIndex: '0',
//   width: '75%',
//   height: '58%',
// };

// const announceStyle = {
//   display: 'inline-block',
//   position: 'absolute',
//   textAlign: 'center',
//   borderRadius: '15px',
//   top: '120px',
//   left: '470px',
//   padding: '10px',
//   width: '300px',
//   color: '#fff',
//   backgroundColor: 'rgba(51, 34, 28, 0.6)',
// };
// import React from 'react';
// import { DropTarget } from 'react-dnd';
// import ItemTypes from './ItemTypes';
// const style = {
//   height: '12rem',
//   width: '12rem',
//   marginRight: '1.5rem',
//   marginBottom: '1.5rem',
//   color: 'white',
//   padding: '1rem',
//   textAlign: 'center',
//   fontSize: '1rem',
//   lineHeight: 'normal',
//   float: 'left',
// };
// const Dustbin = ({ canDrop, isOver, connectDropTarget }) => {
//   const isActive = canDrop && isOver;
//   let backgroundColor = '#222';
//   if (isActive) {
//     backgroundColor = 'darkgreen';
//   } else if (canDrop) {
//     backgroundColor = 'darkkhaki';
//   }
//   return (
//     <div ref={connectDropTarget} style={{ ...style, backgroundColor }}>
//       {isActive ? 'Release to drop' : 'Drag a box here'}
//     </div>
//   );
// };
// export default DropTarget(
//   ItemTypes.BOX,
//   {
//     drop: () => ({ name: 'Dustbin' }),
//   },
//   (connect, monitor) => ({
//     connectDropTarget: connect.dropTarget(),
//     isOver: monitor.isOver(),
//     canDrop: monitor.canDrop(),
//   }),
// )(Dustbin);
