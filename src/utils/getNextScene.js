function getNextScene () {
  const currentScene = window.state.scene
  const currentSceneIndex = window.state.sceneOrder.indexOf(currentScene)
  const nextScene = window.state.sceneOrder[currentSceneIndex + 1]
  return nextScene
}

export default getNextScene
