import HotReloadablePart from './HotReloadablePart'
import {createProvider} from 'react-redux'
import {AppContainer} from 'react-hot-loader'
import './StudioRootComponent.css'
import React from 'react'
import Theater from '$theater/bootstrap/Theater'
import {storeKey} from '$theater/handy/connect'
import {
  contextName,
  contextTypes,
} from '$theater/componentModel/react/utils/theaterContext'
import {TickerProvider} from '$shared/utils/react/TickerContext'

const StoreProvider = createProvider(storeKey)

type Props = {
  theater: Theater
}

type State = {
  HotReloadablePart: typeof HotReloadablePart
}

class StudioRootComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      HotReloadablePart,
    }
  }

  componentWillMount() {
    const self = this

    if (process.env.NODE_ENV === 'development' && module.hot) {
      module.hot.accept('./HotReloadablePart', () => {
        const HotReloadablePart = require('./HotReloadablePart').default
        self.setState({HotReloadablePart})
      })
    }
  }

  render() {
    const {HotReloadablePart} = this.state
    return (
      <TickerProvider ticker={this.props.theater.ticker}>
        <AppContainer>
          <StoreProvider store={this.props.theater.store}>
            <HotReloadablePart />
          </StoreProvider>
        </AppContainer>
      </TickerProvider>
    )
  }

  getChildContext() {
    return {
      [contextName]: this.props.theater,
    }
  }

  static childContextTypes = contextTypes
}

export default StudioRootComponent
