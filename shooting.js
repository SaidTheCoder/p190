AFRAME.registerComponent("bullets",{

    init:function(){
        this.shootBullet();
    },

    shootBullet:function(){
        window.addEventListener("click",(e)=>{
            // if(e.key==="z"){
                var bullet=document.createElement("a-entity")
                bullet.setAttribute("geometry",{primitive:"sphere",radius:.05})
                bullet.setAttribute("material","color","yellow")
                var cam = document.querySelector("#camera")
                pos=cam.getAttribute("position")
                bullet.setAttribute("position",{x:pos.x,y:pos.y,z:pos.z})
                var camera=document.querySelector("#camera").object3D
                var direction=new THREE.Vector3()
                camera.getWorldDirection(direction)
                bullet.setAttribute("velocity",direction.multiplyScalar(-10))
                var scene=document.querySelector("#scene")
        
                bullet.setAttribute("static-body",{shape:"sphere",})
                bullet.addEventListener("collide",this.removeBullet)
                scene.appendChild(bullet)
            // }
            // bullet.addEventListener("click",this.remove)
        })
    },

    remove:function(){
            bullet.setAttribute("visible",false)
    },

    removeBullet:function(e){
        console.log(e.detail.target.el)
        console.log(e.detail.body.el)

        var element=e.detail.target.el
        var elementHit=e.detail.body.el
        if(elementHit.id.includes("robber")){
            elementHit.setAttribute("material",{opacity:"0.01",transparent:true})
            element.removeEventListener("collide",this.shoot)

            var impulse=new CANNON.Vector3(-2,2,1)
            var worldPoint=new CANNON.Vector3().copy(elementHit.getAttribute("position"))
            elementHit.body.applyImpulse(impulse,worldPoint)
            var scene=document.querySelector("#scene")
            scene.removeChild(element)
        }

    }
})