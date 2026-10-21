import Image, { type ImageProps } from 'next/image'
import type { ImageValue } from '../../document/fields'

type Props = Omit<ImageProps, 'src' | 'alt'> & { image: ImageValue | null | undefined; alt?: string }

/** next/image for an image chosen in the editor, keeping its chosen focus when cropped. Renders nothing when unset. */
export function CmsImage({ image, alt, style, ...rest }: Props) {
  if (!image?.src) return null
  const sized = !rest.fill && image.width && image.height ? { width: image.width, height: image.height } : {}
  const position = image.position && image.position !== 'center' ? { objectPosition: image.position } : {}
  return <Image src={image.src} alt={alt ?? image.alt ?? ''} {...sized} {...rest} style={{ ...position, ...style }} />
}
