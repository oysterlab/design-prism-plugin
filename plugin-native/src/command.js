const INSPECTOR_PANEL = "prism-component-inspectorPanel"

const isExistInspectorPanel = (document) => document.documentWindow().contentView().subviews().objectAtIndex(0).subviews().findIndex(d => ''.concat(d.identifier()) === INSPECTOR_PANEL) > -1

const _createInspectorPanel = () => {
  const inspectorPanel = NSStackView.alloc().initWithFrame(NSMakeRect(0, 0, 180, 400))

  inspectorPanel.identifier = INSPECTOR_PANEL
  inspectorPanel.setSpacing(8)
  inspectorPanel.setFlipped(true)
  inspectorPanel.setBackgroundColor(NSColor.windowBackgroundColor())
  inspectorPanel.orientation = 1

  return inspectorPanel
}

function hideInspectorPanel(document) {
  const splitView = document.documentWindow().contentView().subviews().objectAtIndex(0)
  const inspectorPanelIdx = splitView.subviews().findIndex(v => ''.concat(v.identifier()) === INSPECTOR_PANEL)
  if (inspectorPanelIdx == -1) return
  splitView.subviews().splice(inspectorPanelIdx, 1)
  splitView.adjustSubviews()
}

function showInspectorPanel(document) {
  const splitView = document.documentWindow().contentView().subviews().objectAtIndex(0)
  const views = splitView.subviews()
  const inspectorPanel = _createInspectorPanel()

  if (views.length > 1)
    views.splice(views.length - 1, 0, inspectorPanel)

 	splitView.subviews = views
  splitView.adjustSubviews()
  inspectorPanel.setHidden(false)
	splitView.adjustSubviews()

  NSThread.mainThread().threadDictionary()[INSPECTOR_PANEL] = inspectorPanel
}

function updateInspector(document) {
  console.log('updateInspector')
}

export function toggleComponentInspector({actionContext:{document, newSelection}}) {  
  const isShow = newSelection && newSelection.length == 1

  if (!isShow) {
    hideInspectorPanel(document)
    return
  }

  if (!isExistInspectorPanel(document)) 
    showInspectorPanel(document)
  
  updateInspector(document)
}