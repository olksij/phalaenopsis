import { SkeletonCompositeConfig, SkeletonExtendedConfig } from "interfaces";
import resolve from "./resolve";

// the total number of skeletons in the virtual tree
let counter = 0;

// reset counter is used when new page renders
export const resetCounter = () => counter = 0;

//                                                                                      🔢 Element count if it's a group
// Apply [SkeletonConfig] which preserves                                               and should be animated together      
// size & borderRadius to skeleton element                                                    ________|________
export default async function composite(element: HTMLElement, config: SkeletonExtendedConfig, count: number = 1, insert: boolean) {
  if (!config) return;
  //                                       ⌛ used by render/construct.ts
  // a simpler SkeletonConfig interface      _____________|_____________
  window['skeletons'][element.id] = { config, delay: counter += 1 / count } as SkeletonCompositeConfig;
  insert ? element.classList.add('tr') : 0; // to render mark

  // wait till current frame is painted to make sure CSS is applied
  // in order to make the skeleton animation smooth
  await new Promise(resolve => requestAnimationFrame(resolve));

  // delay makes feel of smooth flow of animation
  setTimeout(function (count: number) {
    let style = element.style;
    let mobile: 0 | 1 = window.innerWidth < 920 ? 0 : (config[1] ? 1 : 0)

    // gather required props to change in one Array
    let props = ['width', 'height', 'borderRadius'];

    //                               element.style['propName']
    // apply each property               _______|_______       
    config[mobile]?.forEach((conf, i) => style[props[i]] = conf + 'px');
    
    // to render -> skeleton && animate
    element.classList.replace('tr', 'sl');
    insert ? element.animate(...skeletonKeyframes) : 0;
    
    // notify content dependency tree about skeleton readyness
    resolve(counter, 1 / count);

  }, insert ? counter * 100 : 0, count)
}

// keyframes to apply that loading animation
const skeletonKeyframes: [Keyframe[], Object] = [
  [{ backgroundPositionX: '75vw, 0' }], 
  { duration: 1500, iterations: Infinity }
];
