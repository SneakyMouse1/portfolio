/**
 * Composable for smooth scroll-to-section navigation.
 * Used across Header and Hero to avoid duplicating the same function.
 */
export function useScrollTo() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    // console.log('Scrolling to:', id);
  };

  return { scrollToSection };
}
