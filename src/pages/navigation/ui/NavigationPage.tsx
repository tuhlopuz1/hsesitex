import { PUBLIC_LINKS } from '@/shared/config/api'
import { Button, Card, PageHeader } from '@/shared/ui'

/**
 * Public page — no account needed. navigation.hse.ru forbids embedding outside *.hse.ru
 * (CSP frame-ancestors), so it opens in a new tab instead of an iframe.
 */
export function NavigationPage() {
  return (
    <>
      <PageHeader title="Навигатор по корпусу" subtitle="Доступно без входа" />
      <Card>
        <p style={{ marginTop: 0 }}>
          Интерактивная карта корпуса на Покровском бульваре: поиск аудиторий, этажи и маршруты. Это официальный
          веб-навигатор ВШЭ, тот же, что открывается из мобильного приложения.
        </p>
        <Button onClick={() => window.open(PUBLIC_LINKS.navigation, '_blank', 'noopener')}>Открыть навигатор ↗</Button>
      </Card>
    </>
  )
}
