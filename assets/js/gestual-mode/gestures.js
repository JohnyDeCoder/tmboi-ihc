const { GestureDescription, Finger, FingerDirection } = window.fp;

const upGesture = new GestureDescription("up");
const downGesture = new GestureDescription("down");
const leftGesture = new GestureDescription("left");
const rightGesture = new GestureDescription("right");

upGesture.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
downGesture.addDirection(Finger.Index, FingerDirection.VerticalDown, 1.0);
leftGesture.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);
rightGesture.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0);

const gestures = [upGesture, downGesture, leftGesture, rightGesture];

export { gestures };
