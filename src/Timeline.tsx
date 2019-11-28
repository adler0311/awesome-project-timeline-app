import React, {useState} from 'react';
import {StyleSheet, FlatList, View, Text, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react';
import {darkTheme} from './theme';

const Timeline = ({
  data,
  columnFormat = 'single-column-left',
  showTime = true,
  onEventPress,
  detailContainerStyle,
  titleStyle,
  separator,
  circleSize = 70,
  circleColor = '#007AFF',
  lineColor = 'black',
  dotColor = 'white',
  descriptionStyle = null,
  inputCircleStyle = null,
}) => {
  const [x, setX] = useState(0);

  const renderItem = ({item, index}) => {
    let content;
    switch (columnFormat) {
      case 'single-column-left':
        content = (
          <View style={[styles.rowContainer]}>
            {renderTime(item, index)}
            {renderEvent(item, index)}
            {renderCircle(item, index)}
          </View>
        );
        break;
      // case 'single-column-right':
      //   content = (
      //     <View style={[styles.rowContainer]}>
      //       {renderEvent(item, index)}
      //       {renderTime(item, index)}
      //       {renderCircle(item, index)}
      //     </View>
      //   );
      //   break;
      // case 'two-column':
      //   content =
      //     (item.position && item.position === 'right') ||
      //     (!item.position && index % 2 === 0) ? (
      //       <View style={[styles.rowContainer]}>
      //         {renderTime(item, index)}
      //         {renderEvent(item, index)}
      //         {renderCircle(item, index)}
      //       </View>
      //     ) : (
      //       <View style={[styles.rowContainer]}>
      //         {renderEvent(item, index)}
      //         {renderTime(item, index)}
      //         {renderCircle(item, index)}
      //       </View>
      //     );
      // break;
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
      // case 'single-column-right':
      //   timeWrapper = {
      //     alignItems: 'flex-start',
      //   };
      //   break;
      // case 'two-column':
      //   timeWrapper = {
      //     flex: 1,
      //     alignItems:
      //       (rowData.position && rowData.position === 'right') ||
      //       (!rowData.position && rowID % 2 === 0)
      //         ? 'flex-end'
      //         : 'flex-start',
      //   };
      //   break;
    }
    return (
      <View style={timeWrapper}>
        <View style={[styles.timeContainer]}>
          <Text style={[styles.time]}>{rowData.date}</Text>
        </View>
      </View>
    );
  };

  const renderEvent = (rowData, rowID) => {
    const isLast = data.slice(-1)[0] === rowData;
    lineColor = isLast ? 'rgba(0,0,0,0)' : lineColor;
    let opStyle = null;

    // opStyle에서 detail 부분의 style이 정해진다.
    switch (columnFormat) {
      case 'single-column-left':
        opStyle = {
          borderColor: lineColor,
          borderLeftWidth: 3,
          right: 30,
          paddingLeft: 80,
        };
        break;
      // case 'single-column-right':
      //   opStyle = {
      //     borderColor: lineColor,
      //     borderLeftWidth: 0,
      //     borderRightWidth: 2,
      //     marginRight: 20,
      //     paddingRight: 20,
      //   };
      //   break;
      // case 'two-column':
      //   opStyle =
      //     (rowData.position && rowData.position === 'right') ||
      //     (!rowData.position && rowID % 2 === 0)
      //       ? {
      //           borderColor: lineColor,
      //           borderLeftWidth: 2,
      //           borderRightWidth: 0,
      //           marginLeft: 20,
      //           paddingLeft: 20,
      //         }
      //       : {
      //           borderColor: lineColor,
      //           borderLeftWidth: 0,
      //           borderRightWidth: 2,
      //           marginRight: 20,
      //           paddingRight: 20,
      //         };
      //   break;
    }

    return (
      <View style={[styles.details, opStyle]}>
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
          width: circleSize,
          height: circleSize,
          borderRadius: circleSize / 2,
          backgroundColor: 'white',
          left: 15,
        };
        break;
      // case 'single-column-right':
      //   circleStyle = {
      //     width: width ? circleSize : 0,
      //     height: width ? circleSize : 0,
      //     borderRadius: circleSize / 2,
      //     backgroundColor: circleColor,
      //     left: 10,
      //   };
      //   break;
      // case 'two-column':
      //   circleStyle = {
      //     width: width ? circleSize : 0,
      //     height: width ? circleSize : 0,
      //     borderRadius: circleSize / 2,
      //     backgroundColor: circleColor,
      //     left: 10,
      //   };
      //   break;
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
    return (
      <View style={[styles.circle, circleStyle, inputCircleStyle]}>
        {innerCircle}
      </View>
    );
  };

  const renderSeparator = () => {
    if (!separator) {
      return null;
    }
    return <View style={[styles.separator]} />;
  };

  return (
    <View style={[styles.container]}>
      <FlatList
        style={[styles.listview]}
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => {
          return index + '';
        }}
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
    color: darkTheme.fontColor,
    overflow: 'hidden',
    left: 2,
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
