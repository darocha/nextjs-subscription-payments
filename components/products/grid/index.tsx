import { useEffect, useState, useRef } from 'react';
import { ProductCard } from '../product-card';
import throttle from 'lodash.throttle';
import { ProductType } from '@/types/nft';

enum CardWidth {
  sm = 282,
  xs = 220
}

export default function Grid({
  items = [],
  onBuyClick = () => {},
  cardWidth = CardWidth.sm
}: {
  items?: ProductType[];
  onBuyClick?: Function;
  cardWidth?: CardWidth;
}) {
  const [columns, setColumns] = useState('grid-cols-5');
  const gridElementRef = useRef<any>();

  useEffect(() => {
    const onResize = () => {
      const width = gridElementRef?.current?.clientWidth || window.innerWidth;
      const columns = `grid-cols-${Math.floor(width / cardWidth)}`;
      setColumns(columns);
    };
    onResize();
    const throttleResize = throttle(onResize, 500);
    window.addEventListener('resize', throttleResize);

    return () => {
      window.removeEventListener('resize', throttleResize);
    };
  }, []);

  return (
    <div
      ref={gridElementRef}
      className={`grid ${columns || 'grid-cols-4'} gap-4 p-4 w-full mx-auto`}
    >
      {items.map((product, i) => (
        <div key={`product_card_${i}`}>
          <ProductCard product={product} onBuyClick={onBuyClick} />
        </div>
      ))}
    </div>
  );
}
