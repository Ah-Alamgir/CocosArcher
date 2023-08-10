import { _decorator, Component, Node, Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('animationTOvideo')
export class animationTOvideo extends Component {
    @property({
        type:Node
    })
    anim:Node = null;


    start() {
        let anim = this.anim.getComponent(Animation)
    }

    update(deltaTime: number) {
        
    }
}


