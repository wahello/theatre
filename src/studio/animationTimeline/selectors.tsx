// @flow
import {Selector} from '$studio/types'
import {
  TimelineID,
  LaneID,
  TimelineObject,
  LaneObject,
} from '$studio/animationTimeline/types'

export const getTimelineById: Selector<TimelineObject, TimelineID> = (
  state,
  id,
) => state.animationTimeline.timelines.byId[id]

export const getLanesByIds: Selector<LaneObject[], LaneID[]> = (state, ids) =>
  ids.map(id => state.animationTimeline.lanes.byId[id])