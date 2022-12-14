import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import React from 'react'
import ReactImageMagnify from 'react-image-magnify'
import clsx from 'clsx'
import Image from '../Image'

const PREFIX = 'Media'

const classes = {
  rimRoot: `${PREFIX}-rimRoot`,
  rimSmallImage: `${PREFIX}-rimSmallImage`,
}

/**
 * An element that determines the proper tag to use for a media node within a
 * [`Carousel`](/apiReference/carousel/Carousel).
 */
const Media = function({
  magnifyProps,
  imageProps,
  videoProps,
  src,
  alt,
  magnify,
  sources,
  type = 'image',
  ImageComponent,
  ImageMagnifyComponent,
}) {
  const adjustMagnifyProps = () => {
    const appliedMagnifyProps = { ...(magnifyProps || {}) }
    appliedMagnifyProps.style = {
      ...((magnifyProps && magnifyProps.style) || {}),
      display: 'block',
      objectFit: 'contain',
    }
    appliedMagnifyProps.imageStyle = {
      ...((magnifyProps && magnifyProps.imageStyle) || {}),
      objectFit: 'contain',
    }
    appliedMagnifyProps.className = clsx(magnifyProps && magnifyProps.className, classes.rimRoot)
    appliedMagnifyProps.imageClassName = clsx(
      magnifyProps && magnifyProps.imageClassName,
      classes.rimSmallImage,
    )
    appliedMagnifyProps.enlargedImageStyle = {
      ...((magnifyProps && magnifyProps.enlargedImageStyle) || {}),
      height: '100%',
    }
    return appliedMagnifyProps
  }

  if (type === 'video') {
    if (sources && sources.length) {
      return (
        <video alt={alt} {...videoProps}>
          {sources.map(source => (
            <source key={source.src} src={source.src} type={source.type} />
          ))}
        </video>
      )
    }
    return <video src={src} alt={alt} {...videoProps} />
  }
  if (magnify) {
    const StyledImageMagnifyComponent = styled(ImageMagnifyComponent)(() => ({
      [`& .${classes.rimRoot}`]: {
        height: '100% !important',
        width: '100% !important',
      },

      [`& .${classes.rimSmallImage}`]: {
        height: '100% !important',
        width: '100% !important',
      },
    }))
    return (
      <StyledImageMagnifyComponent
        enlargedImagePosition="over"
        {...adjustMagnifyProps()}
        smallImage={{
          src,
          alt,
          isFluidWidth: true,
        }}
        largeImage={magnify}
      />
    )
  }
  return <ImageComponent key={src} src={src} alt={alt} fill {...imageProps} />
}

Media.propTypes = {
  /**
   * The type of media to display.
   */
  type: PropTypes.oneOf(['image', 'video']),

  /**
   * Props passed to the [`ReactImageMagnify`](https://github.com/ethanselzer/react-image-magnify#usage)
   * element for an `'image'` type when [`magnify`](#prop-magnify) is defined.
   */
  magnifyProps: PropTypes.object,

  /**
   * Other props to pass to the video component.
   */
  videoProps: PropTypes.object,

  /**
   * Other props to pass to the [`Image`](/apiReference/Image) for an `'image'` type.
   */
  imageProps: PropTypes.object,

  /**
   * Used as the `alt` attribute for the `<img>` or `<video>`.
   */
  alt: PropTypes.string,

  /**
   * Used as the `src` attribute for the `<img>` or `<video>`.
   */
  src: PropTypes.string,

  /**
   * Used as the source inside the video `<video>`.
   */
  sources: PropTypes.array,

  /**
   * An object to pass to pass to `ReactImageMagnify` containing the data for the magnified image.
   * If `false`, the media is not able to be magnified.
   */
  magnify: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),

  /**
   * The component type to use to display images.
   */
  ImageComponent: PropTypes.elementType,

  /**
   * The component type to use to display magnified images.
   */
  ImageMagnifyComponent: PropTypes.elementType,
}

Media.defaultProps = {
  ImageComponent: Image,
  ImageMagnifyComponent: ReactImageMagnify,
}

export default Media
