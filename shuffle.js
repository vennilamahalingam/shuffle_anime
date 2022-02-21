const shuffle_speed = 1;
const rotation = 3;
const coupon_code = "12EDF34";


const shuffle_delay = (100 + shuffle_speed*100);
const timeline_delay_sec = 1000 + ((400 + (400 * shuffle_speed )) * rotation);
const timeline_delay = "-="+timeline_delay_sec;



const cup_1_translate_x = [] ; 
const cup_1_translate_y = [];

const cup_2_translate_x = [] ; 
const cup_2_translate_y = [];

const cup_3_translate_x = [] ; 
const cup_3_translate_y = [];

 for(let i=0; i<rotation; i++) 
 {
    cup_1_translate_x.push(
        { value: 0, delay:shuffle_delay},
        { value: 100, delay:shuffle_delay},
        { value: 50, delay:shuffle_delay},
        { value: 0, delay:shuffle_delay}
        )    
    cup_1_translate_y.push( 
        { value: 0, delay:shuffle_delay},
        { value: 0, delay:shuffle_delay },
        { value: -29, delay:shuffle_delay},
        { value: 0, delay:shuffle_delay}
        )


    cup_2_translate_x.push(
        { value: 0,  delay:shuffle_delay},
        { value: -50,  delay:shuffle_delay},
        { value: 50, delay:shuffle_delay},
        { value: 0,  delay:shuffle_delay},
        )
    cup_2_translate_y.push(
        { value: 0,  delay:shuffle_delay},
        { value: 30,  delay:shuffle_delay },
        { value: 30, delay:shuffle_delay},
        { value: 0,  delay:shuffle_delay},
        )


    cup_3_translate_x.push(
        { value: 0,delay:shuffle_delay},
        { value: -50,  delay:shuffle_delay},
        { value: -100,  delay:shuffle_delay},
        { value: 0,  delay:shuffle_delay},
        )
   cup_3_translate_y.push(
        { value: 0,  delay:shuffle_delay},
        { value: -30,  delay:shuffle_delay },
        { value: 0,  delay:shuffle_delay},
        { value: 0,  delay:shuffle_delay},
    )
}

anime(
{
    targets: ".container",
    scale: [0,1],
    easing:"linear"
}
)
var t1 = anime.timeline({
    easing:"linear"
});
t1.
add({
    targets: ".cup1",
    scale: [0,1],
    delay: 500
},).
add(
{
    targets: ".cup2",
    scale: [0,1],
}
   , "-=500").add(
    {
    targets: ".ticket",
    translateX:[
        -100,0
    ],
    translateY:[
        125,0
    ],
    scale:[0,1]
    },"-=500").
add(
{
    targets: ".cup3",
    translateX : [100,0],
    translateY:[-100,0],
    scale: [0,1],
    rotate: [70,0],
},"-=800").
add(
    {
    targets: ".cup1",
    translateX: cup_1_translate_x,
    translateY: cup_1_translate_y,
}).
add({
    targets: ".cup2",
    translateX: cup_2_translate_x,
    translateY: cup_2_translate_y     
},timeline_delay).
add({
    targets: ".ticketCont",
    translateX: cup_3_translate_x,
    translateY: cup_3_translate_y
         
},timeline_delay)

function winEvent (event)
{
    anime({
        targets: "."+event.target.className,
        rotate: 99,
        translateX: "50px",
    })
    setTimeout(()=>{
        document.querySelector(".winningCont input").value = coupon_code;
        document.querySelector("#container").setAttribute("result","won")   
    },1000)
    
}

function failEvent (event)
{
    event.target.className.indexOf(1) ? 
    anime({
        targets: "."+event.target.className,
        rotate: -99,
        translateX: "-50px",
    })
    :
    anime({
        targets: "."+event.target.className,
        rotate: 99,
        translateX: "50px",
    })

    setTimeout(()=>{
        document.querySelector(".winningCont input").value = "";
        document.querySelector("#container").setAttribute("result","fail")
    },1000)
    
}
function restart()
{
    document.querySelector(".winningCont input").value = "";
    document.querySelector("#container").setAttribute("result","")
    t1.restart();
}   