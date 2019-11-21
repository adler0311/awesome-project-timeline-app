import React, {useState} from 'react';
import {
  StyleSheet,
  FlatList,
  Image,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {observer} from 'mobx-react';

const Timeline = ({
  data,
  style,
  listViewStyle,
  options,

  columnFormat = 'single-column-left',
  rowContainerStyle,
  showTime = true,
  timeContainerStyle,
  timeStyle,
  renderFullLine,
  onEventPress,
  detailContainerStyle,
  titleStyle,
  descriptionStyle,
  separator,
  separatorStyle,
  lineWidth = 2,
  circleSize = 70,
  circleColor = '#007AFF',
  lineColor = 'black',
  dotColor = 'white',
}) => {
  const [x, setX] = useState(0);
  const [width, setWidth] = useState(0);

  const renderItem = ({item, index}) => {
    let content;
    switch (columnFormat) {
      case 'single-column-left':
        content = (
          <View style={[styles.rowContainer, rowContainerStyle]}>
            {renderTime(item, index)}
            {renderEvent(item, index)}
            {renderCircle(item, index)}
          </View>
        );
        break;
      case 'single-column-right':
        content = (
          <View style={[styles.rowContainer, rowContainerStyle]}>
            {renderEvent(item, index)}
            {renderTime(item, index)}
            {renderCircle(item, index)}
          </View>
        );
        break;
      case 'two-column':
        content =
          (item.position && item.position === 'right') ||
          (!item.position && index % 2 === 0) ? (
            <View style={[styles.rowContainer, rowContainerStyle]}>
              {renderTime(item, index)}
              {renderEvent(item, index)}
              {renderCircle(item, index)}
            </View>
          ) : (
            <View style={[styles.rowContainer, rowContainerStyle]}>
              {renderEvent(item, index)}
              {renderTime(item, index)}
              {renderCircle(item, index)}
            </View>
          );
        break;
    }

    return <View key={index}>{content}</View>;
  };

  const renderTime = (rowData, rowID) => {
    if (!showTime) {
      return null;
    }

    let timeWrapper = null;
    switch (columnFormat) {
      case 'single-column-left':
        timeWrapper = {
          alignItems: 'flex-end',
          zIndex: 2,
          marginTop: 25,
          left: 10,
        };
        break;
      case 'single-column-right':
        timeWrapper = {
          alignItems: 'flex-start',
        };
        break;
      case 'two-column':
        timeWrapper = {
          flex: 1,
          alignItems:
            (rowData.position && rowData.position === 'right') ||
            (!rowData.position && rowID % 2 === 0)
              ? 'flex-end'
              : 'flex-start',
        };
        break;
    }
    return (
      <View style={timeWrapper}>
        <View style={[styles.timeContainer, timeContainerStyle]}>
          <Text style={[styles.time, timeStyle]}>{rowData.date}</Text>
        </View>
      </View>
    );
  };

  const renderEvent = (rowData, rowID) => {
    lineWidth = rowData.lineWidth ? rowData.lineWidth : lineWidth;

    const isLast = renderFullLine
      ? renderFullLine
      : data.slice(-1)[0] === rowData;
    lineColor = isLast
      ? 'rgba(0,0,0,0)'
      : rowData.lineColor
      ? rowData.lineColor
      : lineColor;
    let opStyle = null;

    // opStyle에서 detail 부분의 style이 정해진다.
    switch (columnFormat) {
      case 'single-column-left':
        opStyle = {
          borderColor: lineColor,
          borderLeftWidth: lineWidth,
          borderRightWidth: 0,
          right: 30,
          paddingLeft: 80,
          zIndex: -1,
        };
        break;
      case 'single-column-right':
        opStyle = {
          borderColor: lineColor,
          borderLeftWidth: 0,
          borderRightWidth: lineWidth,
          marginRight: 20,
          paddingRight: 20,
        };
        break;
      case 'two-column':
        opStyle =
          (rowData.position && rowData.position === 'right') ||
          (!rowData.position && rowID % 2 === 0)
            ? {
                borderColor: lineColor,
                borderLeftWidth: lineWidth,
                borderRightWidth: 0,
                marginLeft: 20,
                paddingLeft: 20,
              }
            : {
                borderColor: lineColor,
                borderLeftWidth: 0,
                borderRightWidth: lineWidth,
                marginRight: 20,
                paddingRight: 20,
              };
        break;
    }

    return (
      <View
        style={[styles.details, opStyle]}
        onLayout={evt => {
          if (!x && !width) {
            const {x, width} = evt.nativeEvent.layout;
            setX(x);
            setWidth(width);
          }
        }}>
        <TouchableOpacity
          disabled={onEventPress == null}
          style={[detailContainerStyle]}
          onPress={() => (onEventPress ? onEventPress(rowData) : null)}>
          <View style={styles.detail}>{renderDetail(rowData, rowID)}</View>
        </TouchableOpacity>
        {renderSeparator()}
      </View>
    );
  };

  const renderDetail = (rowData, rowID) => {
    let title = rowData.description ? (
      <View>
        <Text style={[styles.title, titleStyle]}>{rowData.title}</Text>
        <Text style={[styles.description, descriptionStyle]}>
          {rowData.description.length < 20
            ? rowData.description
            : `${rowData.description.slice(0, 20)}...`}
        </Text>
      </View>
    ) : (
      <Text style={[styles.title, titleStyle]}>{rowData.title}</Text>
    );
    return <View style={styles.container}>{title}</View>;
  };

  const renderCircle = (rowData, rowID) => {
    let circleStyle = null;

    switch (columnFormat) {
      case 'single-column-left':
        circleStyle = {
          width: x ? circleSize : 0,
          height: x ? circleSize : 0,
          borderRadius: circleSize / 2,
          backgroundColor: 'white',
          left: 10,
        };
        break;
      case 'single-column-right':
        circleStyle = {
          width: width ? circleSize : 0,
          height: width ? circleSize : 0,
          borderRadius: circleSize / 2,
          backgroundColor: circleColor,
          left: width - circleSize / 2 - (lineWidth - 1) / 2,
        };
        break;
      case 'two-column':
        circleStyle = {
          width: width ? circleSize : 0,
          height: width ? circleSize : 0,
          borderRadius: circleSize / 2,
          backgroundColor: circleColor,
          left: width - circleSize / 2 - (lineWidth - 1) / 2,
        };
        break;
    }

    let innerCircle = null;
    switch (innerCircle) {
      // case "icon":
      //   let iconDefault = rowData.iconDefault
      //     ? rowData.iconDefault
      //     : iconDefault;
      //   let iconSource = rowData.icon ? rowData.icon : iconDefault;
      //   if (rowData.icon)
      //     iconSource =
      //       rowData.icon.constructor === String
      //         ? { uri: rowData.icon }
      //         : rowData.icon;
      //   let iconStyle = {
      //     height: circleSize,
      //     width: circleSize
      //   };
      //   innerCircle = (
      //     <Image
      //       source={iconSource}
      //       defaultSource={iconDefault}
      //       style={[iconStyle, iconStyle]}
      //     />
      //   );
      //   break;
      case 'dot':
        let dotStyle = {
          height: circleSize / 2,
          width: circleSize / 2,
          borderRadius: circleSize / 4,
          backgroundColor: rowData.dotColor ? rowData.dotColor : dotColor,
        };
        innerCircle = <View style={[styles.dot, dotStyle]} />;
        break;
    }
    return <View style={[styles.circle, circleStyle]}>{innerCircle}</View>;
  };

  const renderSeparator = () => {
    if (!separator) {
      return null;
    }
    return <View style={[styles.separator, separatorStyle]} />;
  };

  return (
    <View style={[styles.container, style]}>
      <FlatList
        style={[styles.listview, listViewStyle]}
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => {
          return index + '';
        }}
        {...options}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listview: {
    flex: 1,
    paddingLeft: 50,
    paddingRight: 20,
  },
  sectionHeader: {
    marginBottom: 15,
    backgroundColor: '#007AFF',
    height: 30,
    justifyContent: 'center',
  },
  sectionHeaderText: {
    color: '#FFF',
    fontSize: 18,
    alignSelf: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    flex: 1,
    //alignItems: 'stretch',
    justifyContent: 'center',
  },
  timeContainer: {
    minWidth: 45,
    width: 80,
  },
  time: {
    textAlign: 'right',
    color: 'black',
    overflow: 'hidden',
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 10,
    zIndex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    borderLeftWidth: 2,
    flex: 1,
    paddingBottom: 20,
  },
  detail: {paddingTop: 10, paddingBottom: 10},
  description: {
    marginTop: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#aaa',
    marginTop: 10,
    marginBottom: 10,
  },
  detailContainerStyle: {
    flex: 1,
  },
});

export default observer(Timeline);
