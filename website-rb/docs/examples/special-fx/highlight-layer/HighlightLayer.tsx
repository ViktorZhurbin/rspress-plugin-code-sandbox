import { HighlightLayer } from '@babylonjs/core/Layers/highlightLayer'
import { Color3, Vector3 } from '@babylonjs/core/Maths/math'
import { Mesh } from '@babylonjs/core/Meshes/mesh'
import { Control } from '@babylonjs/gui/2D/controls/control'
// import "@babylonjs/inspector";
import React, { useEffect, useRef } from 'react'
import { Engine, Scene } from 'react-babylonjs'

/**
 * TODO
 * alpha mesh highlight
 */
function WithHighlightLayer() {
  const sphereRef = useRef<Mesh | null>(null)
  const highlightLayerEL = useRef<HighlightLayer | null>(null)

  useEffect(() => {
    if (highlightLayerEL.current && sphereRef.current) {
      highlightLayerEL.current.addMesh(sphereRef.current, Color3.Green())
    }
  }, [sphereRef, highlightLayerEL])

  const onCheckboxClicked = (value: boolean) => {
    if (highlightLayerEL.current) {
      highlightLayerEL.current.isEnabled = value
    }
  }

  return (
    <>
      <freeCamera name="camera1" position={new Vector3(0, 5, -10)} setTarget={[Vector3.Zero()]} />
      <hemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />
      <sphere
        name="sphere1"
        ref={sphereRef}
        diameter={2}
        segments={16}
        position={new Vector3(0, 1, 0)}
      />
      <ground name="ground1" width={6} height={6} subdivisions={2} />
      <highlightLayer name="hl" ref={highlightLayerEL} />
      <adtFullscreenUi name="ui1">
        <stackPanel
          width="200px"
          isVertical={false}
          horizontalAlignment={Control.HORIZONTAL_ALIGNMENT_RIGHT}
          verticalAlignment={Control.VERTICAL_ALIGNMENT_CENTER}
        >
          <checkbox
            width="20px"
            height="20px"
            isChecked={true}
            color="green"
            onIsCheckedChangedObservable={onCheckboxClicked}
          />
          <textBlock
            text="Highlight Enabled"
            width="180px"
            paddingLeft="5px"
            color="white"
            textHorizontalAlignment={Control.HORIZONTAL_ALIGNMENT_LEFT}
          />
        </stackPanel>
      </adtFullscreenUi>
    </>
  )
}

const HighlightlayerComp = () => (
  <div style={{ flex: 1, display: 'flex' }}>
    <Engine antialias adaptToDeviceRatio canvasId="babylon-js">
      <Scene>
        <WithHighlightLayer />
      </Scene>
    </Engine>
  </div>
)

export default HighlightlayerComp
