import { useState } from 'react'
import Flex from '../Flex/Flex'
import {
  AccordionArrowIconDown,
  AccordionArrowIconUp,
} from '../../Icons/ArrowIcon'
import { accordionUseStyles } from './Accordion.styles'
import { Button } from '../Button/Button'
import { ButtonVariants } from '../Button/Button.types'
import {
  SubscriptionAndPaymentSettingsVariant,
  SubscriptionAndPaymentVariant,
} from 'src/modules/model/components/SubscriptionAndPaymentRenderer/SubscriptionAndPurchaseRenderer'

interface AccordionProps {
  title: string
  items: any[]
  Renderer: ({
    content,
    variant,
  }: {
    settingsVariant: SubscriptionAndPaymentSettingsVariant
    content: any
    variant: SubscriptionAndPaymentVariant
  }) => JSX.Element
  rendererVariant: SubscriptionAndPaymentVariant
  handleAdd: (e: any) => void
  isDisabled: boolean
}

const Accordion = ({
  title,
  Renderer,
  rendererVariant,
  items,
  isDisabled = false,
  handleAdd,
}: AccordionProps) => {
  const [isActive, setIsActive] = useState(false)
  const styles = accordionUseStyles({ isAddButtonActive: items.length <= 10 })

  const toggleAccordion = () => !isDisabled && setIsActive(!isActive)

  const handleAddInner = (e: any) => {
    e.stopPropagation()
    handleAdd(e)
  }

  return (
    <div className={styles.accordionItem}>
      <div
        className={styles.accordionTitleWrapper}
        onClick={toggleAccordion}
        role="presentation"
      >
        <Flex direction="row" alignItems="center">
          <Button
            className={styles.addButton}
            variant={ButtonVariants.Icon}
            isButtonInteractive={items.length < 10}
            active={items.length < 10}
            handleClick={handleAddInner}
          >
            +
          </Button>
          <div className={styles.accordionTitle}>{title}</div>
        </Flex>
        {!isDisabled && (
          <div>
            {isActive ? (
              <AccordionArrowIconUp isDisabled={isDisabled} />
            ) : (
              <AccordionArrowIconDown isDisabled={isDisabled} />
            )}
          </div>
        )}
      </div>

      {Boolean(items.length && isActive) && (
        <div className={styles.accordionContent}>
          {items.map((item, index) => {
            const is3n = (index + 1) % 3 === 0

            return (
              <Renderer
                settingsVariant={
                  is3n
                    ? SubscriptionAndPaymentSettingsVariant.Secondary
                    : SubscriptionAndPaymentSettingsVariant.Primary
                }
                variant={rendererVariant}
                content={item}
                key={item.id}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Accordion
