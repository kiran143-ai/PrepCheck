import { img } from '../../data/images'
import { useDemo } from '../DemoContext'
import { Button } from './Button'
import { Modal } from './Modal'

/**
 * Video player dialog. Plays `src` when provided; otherwise shows a
 * "coming soon" poster that routes to the inline demo form instead.
 */
export function VideoDialog({ open, onClose, title, description, src, poster = img['session-1'], posterAlt = 'Student in a live online lesson', comingSoon }) {
  const { openDemo } = useDemo()
  return (
    <Modal open={open} onClose={onClose} title={title} description={description} size="max-w-3xl">
      {src ? (
        <video src={src} controls autoPlay className="aspect-video w-full rounded-2xl bg-black" />
      ) : (
        <div className="relative overflow-hidden rounded-2xl">
          <img src={poster} alt={posterAlt} className="aspect-video w-full object-cover" />
          <div className="absolute inset-0 grid place-items-center bg-ink/55 p-6 text-center text-white">
            <div>
              <p className="text-lg font-bold">{comingSoon}</p>
              <p className="mt-2 text-sm text-white/80">See it live instead — book a free demo lesson for your child.</p>
              <Button
                variant="white"
                arrow
                className="mt-5 h-11 px-6 text-[15px]"
                onClick={() => {
                  onClose()
                  openDemo()
                }}
              >
                Book a Free Demo
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}
