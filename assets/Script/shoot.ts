import { _decorator, Animation, Component, EventMouse, EventTouch, input, Input, Node, UITransform, v2, v3, Prefab, color, log, instantiate, RigidBody2D, Vec2 } from 'cc';
const { ccclass, property } = _decorator;




let animation:Animation;
let TouchPos;
let ClickPos;
let maxRotatioDown= -38;
let maxRotationUp = 47;

@ccclass('shoot')
export class shoot extends Component {
    @property({type: Node})
    Bow:Node = null;
    

    @property({type: Prefab})
    Arrow:Prefab = null;
    
    @property({type: Node})
    leftHand:Node = null;

    @property({type: Node})
    Head:Node = null;

    @property({type: Node})
    canvasNode:Node = null;

    @property({type: Node})
    ProgressBar:Node = null;
    angle: number;
    speed: number=50;

    errow:Node; //  the arrow in which velocity is going to implement
    destroyErrow: Node; //the arror that has to remove
    




protected start(): void {
    input.on(Input.EventType.MOUSE_DOWN, this.onMouseCLick, this );
    // input.on(Input.EventType.TOUCH_START, this.getTouchAngle, this);

}


onMouseCLick(event: EventMouse){
    // animation = this.canvasNode.getComponent(Animation)
    // animation.play()
    this.leftHand.angle = 0
    this.Head.angle = 0
    
    ClickPos = this.leftHand.getComponent(UITransform).convertToNodeSpaceAR(v3(event.getUILocationX(), event.getUILocationY(),0)) // getting the clic position regarding lefthand
    this.angle = (360+Math.round(180*Math.atan2(ClickPos.y, ClickPos.x)/Math.PI))%360; // getting the angle

    if(this.angle>maxRotatioDown && this.angle<maxRotationUp){
        this.leftHand.angle = this.angle
    }else if(this.angle>320){
        this.leftHand.angle = this.angle
    }else if(this.angle>180){
        this.leftHand.angle = maxRotatioDown
    }else if(this.angle>maxRotationUp){
        this.leftHand.angle = maxRotationUp
    }



    this.leftHand.addChild(instantiate(this.Arrow)) // adding the errow as child of hand 
    this.Head.angle = this.leftHand.angle //setting the head animation
    this.errow = this.leftHand.children[this.leftHand.children.length-1] //putting the last errow 

    this.SetArrowAngleToShoot(this.leftHand.angle)
}







//get the angle of touch position
getTouchAngle(event: EventTouch){


    TouchPos = this.Bow.getComponent(UITransform).convertToNodeSpaceAR(v3(event.getUILocation().x, event.getUILocation().y,0))
    this.angle = (360+Math.round(180*Math.atan2(TouchPos.y, TouchPos.x)/Math.PI))%360;
    console.log(this.angle, this.Bow.angle)
    this.Bow.angle = this.angle
}






SetArrowAngleToShoot(arrowAngle){
    let radian = arrowAngle * Math.PI / 180;    // Calculate the horizontal and vertical components of the velocity
    let vx = this.speed * Math.cos(radian);
    let vy = this.speed * Math.sin(radian);
    this.errow.getComponent(RigidBody2D).linearVelocity = v2(vx,vy);     // Apply an impulse force to the rigidbody of the ball
}








}


