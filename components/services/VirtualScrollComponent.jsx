import { useRef } from 'react';
import MessageField from '../ChatsComponents/ChatRoom/MessageFieldComponent/MessageFieldComponent.jsx'
import { AutoSizer } from 'react-virtualized';
import { VariableSizeList } from 'react-window';

function VirtualScrollComponent(data) {
  // Задайте данные, которые будут отображаться в списке
  

  // Создайте функцию, которая будет возвращать высоту каждого элемента в списке
  const getItemSize = index => {
    // Здесь можно определить высоту элемента в зависимости от его содержимого
    // В этом примере мы используем реф для измерения высоты каждого элемента
    // Вы также можете использовать другие методы измерения, в зависимости от вашего контента
    // Возвращаем минимальную высоту элемента, чтобы избежать мерцания при пересчете размеров
    if (itemRefs.current[index]) {
      return Math.max(itemRefs.current[index].clientHeight, 50);
    }
    return 50;
  };

  // Ссылки на элементы списка для измерения их размеров
  const itemRefs = useRef([]);

  // Рендеринг каждого элемента списка
  const renderItem = ({ index, style }) => {
    const item = data[index];
    return (
      <div ref={ref => (itemRefs.current[index] = ref)} style={style}>
        {item}
      </div>
    );
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <VariableSizeList
          itemCount={data.length}
          itemSize={getItemSize}
          height={height}
          width={width}
        >
          {renderItem.map((msg, index) => {
            const currentDate = new Date(msg.date);
            const options = { day: 'numeric', month: 'long' };
            const formattedDate = new Intl.DateTimeFormat('ru-RU', options).format(
              currentDate
            );
            const prevMessage = renderItem[index - 1];
            const prevDate =
              prevMessage && new Date(prevMessage.date);

            return (
              <>
                {currentDate.getMonth() !== prevDate?.getMonth() && (
                  <div className={css.date} key={index}>
                    <div className={css.line} />
                    <div className={css.value}>{formattedDate}</div>
                    <div className={css.line} />
                  </div>
                )}
                <MessageField
                  message={msg}
                  key={msg.id}
                  CN={msg.sender === +userId ? css.left : css.right}
                  ref={index === renderItem.length - 1 ? listRef : null}
                />
              </>
            );
          })}
        </VariableSizeList>
      )}
    </AutoSizer>
  );
}

export default VirtualScrollComponent;