import robot from '../robot'
import stage from './stage'

const objects = []
objects.push(stage(50))
objects.push(robot(0, 2, 0))
/*
objects.push(robot(-6, 2, 0))
objects.push(robot(-3, 2, 0))
objects.push(robot(3, 2, 0))
objects.push(robot(6, 2, 0))
*/

export default objects
