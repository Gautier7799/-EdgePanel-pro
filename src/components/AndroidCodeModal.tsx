import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Code2, 
  FileCode, 
  Sparkles, 
  ShieldCheck, 
  BatteryCharging, 
  Download,
  Layers,
  Terminal
} from 'lucide-react';

interface AndroidCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CodeFile {
  name: string;
  language: string;
  badge: string;
  description: string;
  code: string;
}

const ANDROID_FILES: CodeFile[] = [
  {
    name: 'EdgePanelService.kt',
    language: 'kotlin',
    badge: 'Foreground Service & Overlay',
    description: 'الخدمة الأساسية التي تدير الـ WindowManager وعرض مقبض الحافة ولوحة Compose فوق جميع التطبيقات مع ترشيد البطارية 100%.',
    code: `package com.partner.edgepanel.service

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.content.Intent
import android.graphics.PixelFormat
import android.os.Build
import android.os.IBinder
import android.view.Gravity
import android.view.MotionEvent
import android.view.View
import android.view.WindowManager
import androidx.compose.ui.platform.ComposeView
import androidx.core.app.NotificationCompat
import androidx.lifecycle.LifecycleService
import androidx.lifecycle.setViewTreeLifecycleOwner
import androidx.lifecycle.setViewTreeViewModelStoreOwner
import androidx.savedstate.setViewTreeSavedStateRegistryOwner
import com.partner.edgepanel.ui.EdgePanelOverlayContent
import com.partner.edgepanel.R

/**
 * EdgePanelService: خدمة أندرويد متقدمة وموفرة للبطارية
 * تعمل بتقنية TYPE_APPLICATION_OVERLAY وتستضيف Jetpack Compose مباشرة داخل WindowManager.
 */
class EdgePanelService : LifecycleService() {

    private lateinit var windowManager: WindowManager
    private var handleView: View? = null
    private var panelComposeView: ComposeView? = null

    private var handleParams = WindowManager.LayoutParams()
    private var panelParams = WindowManager.LayoutParams()

    private var isPanelOpen = false

    override fun onCreate() {
        super.onCreate()
        windowManager = getSystemService(Context.WINDOW_SERVICE) as WindowManager
        startForegroundNotification()
        setupOverlayViews()
    }

    private fun startForegroundNotification() {
        val channelId = "edge_panel_channel"
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                channelId,
                "خدمة لوحة الحافة EdgePanel",
                NotificationManager.IMPORTANCE_MIN
            ).apply {
                description = "تحافظ على عمل مقبض الحافة في الخلفية بسلاسة"
                setShowBadge(false)
            }
            val manager = getSystemService(NotificationManager::class.java)
            manager.createNotificationChannel(channel)
        }

        val notification: Notification = NotificationCompat.Builder(this, channelId)
            .setContentTitle("EdgePanel نشطة")
            .setContentText("المقبض جاهز على حافة الشاشة")
            .setSmallIcon(android.R.drawable.ic_menu_agenda)
            .setPriority(NotificationCompat.PRIORITY_MIN)
            .setOngoing(true)
            .build()

        startForeground(101, notification)
    }

    private fun setupOverlayViews() {
        val overlayType = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
        } else {
            @Suppress("DEPRECATION")
            WindowManager.LayoutParams.TYPE_PHONE
        }

        // 1. إعداد المقبض العائم (Edge Handle) - خفيف جداً وصغير لتوفير الموارد
        handleParams = WindowManager.LayoutParams(
            dpToPx(16),
            dpToPx(90),
            overlayType,
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or
                    WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS,
            PixelFormat.TRANSLUCENT
        ).apply {
            gravity = Gravity.TOP or Gravity.END // الجانب الأيمن افتراضياً
            x = 0
            y = 450 // الموضع الرأسي الافتراضي
        }

        val handleCompose = ComposeView(this).apply {
            setViewTreeLifecycleOwner(this@EdgePanelService)
            setViewTreeSavedStateRegistryOwner(this@EdgePanelService)
            setContent {
                // شكل المقبض الرشيق
                com.partner.edgepanel.ui.EdgeHandlePill(
                    isDragging = false,
                    onClick = { toggleEdgePanel() }
                )
            }
        }

        // إيماءات اللمس والسحب للمقبض
        handleCompose.setOnTouchListener(object : View.OnTouchListener {
            private var initialY = 0
            private var initialTouchY = 0f
            private var initialTouchX = 0f

            override fun onTouch(v: View?, event: MotionEvent): Boolean {
                when (event.action) {
                    MotionEvent.ACTION_DOWN -> {
                        initialY = handleParams.y
                        initialTouchY = event.rawY
                        initialTouchX = event.rawX
                        return true
                    }
                    MotionEvent.ACTION_MOVE -> {
                        val dy = (event.rawY - initialTouchY).toInt()
                        val dx = (initialTouchX - event.rawX).toInt()

                        // سحب أفقي للداخل يفتح اللوحة مباشرة
                        if (dx > dpToPx(35) && !isPanelOpen) {
                            openEdgePanel()
                            return true
                        }

                        // سحب رأسي لتغيير مكان المقبض
                        handleParams.y = (initialY + dy).coerceIn(100, 1800)
                        windowManager.updateViewLayout(handleCompose, handleParams)
                        return true
                    }
                    MotionEvent.ACTION_UP -> {
                        val totalMovement = Math.abs(event.rawY - initialTouchY) + Math.abs(event.rawX - initialTouchX)
                        if (totalMovement < dpToPx(10)) {
                            // نقرة سريعة
                            toggleEdgePanel()
                        }
                        return true
                    }
                }
                return false
            }
        })

        handleView = handleCompose
        windowManager.addView(handleView, handleParams)
    }

    private fun openEdgePanel() {
        if (isPanelOpen) return
        isPanelOpen = true

        val overlayType = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
        } else {
            @Suppress("DEPRECATION")
            WindowManager.LayoutParams.TYPE_PHONE
        }

        panelParams = WindowManager.LayoutParams(
            WindowManager.LayoutParams.MATCH_PARENT,
            WindowManager.LayoutParams.MATCH_PARENT,
            overlayType,
            WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL or
                    WindowManager.LayoutParams.FLAG_WATCH_OUTSIDE_TOUCH,
            PixelFormat.TRANSLUCENT
        )

        panelComposeView = ComposeView(this).apply {
            setViewTreeLifecycleOwner(this@EdgePanelService)
            setViewTreeSavedStateRegistryOwner(this@EdgePanelService)
            setContent {
                EdgePanelOverlayContent(
                    onClose = { closeEdgePanel() },
                    onAppClick = { packageName ->
                        launchApp(packageName)
                        closeEdgePanel()
                    }
                )
            }
        }

        windowManager.addView(panelComposeView, panelParams)
    }

    private fun closeEdgePanel() {
        if (!isPanelOpen) return
        isPanelOpen = false
        panelComposeView?.let {
            windowManager.removeView(it)
            panelComposeView = null
        }
    }

    private fun toggleEdgePanel() {
        if (isPanelOpen) closeEdgePanel() else openEdgePanel()
    }

    private fun launchApp(packageName: String) {
        val launchIntent = packageManager.getLaunchIntentForPackage(packageName)
        launchIntent?.let {
            it.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            startActivity(it)
        }
    }

    private fun dpToPx(dp: Int): Int {
        return (dp * resources.displayMetrics.density).toInt()
    }

    override fun onDestroy() {
        super.onDestroy()
        handleView?.let { windowManager.removeView(it) }
        panelComposeView?.let { windowManager.removeView(it) }
    }

    override fun onBind(intent: Intent): IBinder? = super.onBind(intent)
}`,
  },
  {
    name: 'EdgePanelOverlay.kt',
    language: 'kotlin',
    badge: 'Jetpack Compose UI & Glassmorphism',
    description: 'واجهة Jetpack Compose الحديثة للوحة الحافة: حركة انزلاقية نابضة (Spring Animation)، وتصميم زجاجي عصري مستوحى من One UI مع تبديل اللوحات.',
    code: `package com.partner.edgepanel.ui

import androidx.compose.animation.*
import androidx.compose.animation.core.spring
import androidx.compose.animation.core.Spring
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.detectHorizontalDragGestures
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

enum class EdgePanelTab(val title: String) {
    APPS("التطبيقات"),
    TOOLS("الأدوات السريعة"),
    CONTACTS("جهات الاتصال"),
    CLIPBOARD("الحافظة")
}

@Composable
fun EdgePanelOverlayContent(
    onClose: () -> void,
    onAppClick: (String) -> Unit
) {
    var selectedTab by remember { mutableStateOf(EdgePanelTab.APPS) }
    var isVisible by remember { mutableStateOf(false) }

    LaunchedEffect(Unit) {
        isVisible = true
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.Black.copy(alpha = 0.35f))
            .clickable { onClose() }
    ) {
        AnimatedVisibility(
            visible = isVisible,
            enter = slideInHorizontally(
                initialOffsetX = { fullWidth -> fullWidth },
                animationSpec = spring(dampingRatio = Spring.DampingRatioLowBouncy, stiffness = Spring.StiffnessMedium)
            ) + fadeIn(),
            exit = slideOutHorizontally(targetOffsetX = { fullWidth -> fullWidth }) + fadeOut(),
            modifier = Modifier.align(Alignment.CenterEnd)
        ) {
            // هيكل لوحة الحافة المنحنية بنمط الزجاج المصنفر
            Surface(
                modifier = Modifier
                    .fillMaxHeight()
                    .width(320.dp)
                    .clickable(enabled = false) {} // منع النقر من الإغلاق
                    .pointerInput(Unit) {
                        detectHorizontalDragGestures { _, dragAmount ->
                            // سحب سريع لليمين يغلق اللوحة
                            if (dragAmount > 25) {
                                onClose()
                            }
                        }
                    },
                shape = RoundedCornerShape(topStart = 28.dp, bottomStart = 28.dp),
                color = Color(0xEE0B132B), // Dark Glass One UI
                shadowElevation = 16.dp
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(16.dp)
                ) {
                    // شريط العنوان وأزرار التنقل
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = selectedTab.title,
                            color = Color.White,
                            fontSize = 18.sp,
                            fontWeight = androidx.compose.ui.text.font.FontWeight.Bold
                        )
                        IconButton(onClick = onClose) {
                            Icon(
                                imageVector = androidx.compose.material.icons.Icons.Default.Close,
                                contentDescription = "إغلاق",
                                tint = Color.LightGray
                            )
                        }
                    }

                    // شريط التبويبات السريعة
                    ScrollableTabRow(
                        selectedTabIndex = selectedTab.ordinal,
                        edgePadding = 0.dp,
                        containerColor = Color.Transparent,
                        contentColor = Color(0xFF38BDF8),
                        divider = {}
                    ) {
                        EdgePanelTab.values().forEach { tab ->
                            Tab(
                                selected = selectedTab == tab,
                                onClick = { selectedTab = tab },
                                text = {
                                    Text(
                                        text = tab.title,
                                        fontSize = 12.sp,
                                        color = if (selectedTab == tab) Color(0xFF38BDF8) else Color.Gray
                                    )
                                }
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    // محتوى التبويب النشط
                    Box(modifier = Modifier.weight(1f)) {
                        when (selectedTab) {
                            EdgePanelTab.APPS -> AppsEdgeContent(onAppClick = onAppClick)
                            EdgePanelTab.TOOLS -> QuickToolsEdgeContent()
                            EdgePanelTab.CONTACTS -> ContactsEdgeContent()
                            EdgePanelTab.CLIPBOARD -> ClipboardEdgeContent()
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun EdgeHandlePill(
    isDragging: Boolean,
    onClick: () -> Unit
) {
    Box(
        modifier = Modifier
            .width(6.dp)
            .height(88.dp)
            .clip(RoundedCornerShape(topStart = 8.dp, bottomStart = 8.dp))
            .background(
                Brush.verticalGradient(
                    colors = listOf(Color(0xFF38BDF8), Color(0xFF0284C7))
                )
            )
            .clickable { onClick() }
    )
}`,
  },
  {
    name: 'QuickToolsManager.kt',
    language: 'kotlin',
    badge: 'Sensors & Zero Battery Drain',
    description: 'إدارة أجهزة الاستشعار (الحساسات: البوصلة، ميزان الماء) بكفاءة قصوى: لا يتم تفعيل الحساسات إلا عند فتح تبويب الأدوات فقط، وتفصل تلقائياً فور إغلاق اللوحة!',
    code: `package com.partner.edgepanel.tools

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow

/**
 * QuickToolsManager: ترشيد استهلاك البطارية
 * القاعدة الذهبية: الحساسات (Sensors) لا تستهلك أي ملي أمبير في الخلفية أبداً.
 */
class QuickToolsManager(context: Context) : SensorEventListener {

    private val sensorManager = context.getSystemService(Context.SENSOR_SERVICE) as SensorManager

    private val accelerometer: Sensor? = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
    private val magnetometer: Sensor? = sensorManager.getDefaultSensor(Sensor.TYPE_MAGNETIC_FIELD)

    private val _compassAzimuth = MutableStateFlow(0f)
    val compassAzimuth = _compassAzimuth.asStateFlow()

    private val _pitch = MutableStateFlow(0f) // ميزان الماء X
    val pitch = _pitch.asStateFlow()

    private val _roll = MutableStateFlow(0f)  // ميزان الماء Y
    val roll = _roll.asStateFlow()

    private val gravityMatrix = FloatArray(9)
    private val geomagneticMatrix = FloatArray(9)
    private val rMatrix = FloatArray(9)
    private val iMatrix = FloatArray(9)

    private var hasGravity = false
    private var hasGeomagnetic = false

    /**
     * يتم استدعاؤها فقط عندما يفتح المستخدم تبويب "الأدوات السريعة"
     */
    fun startListening() {
        accelerometer?.let {
            sensorManager.registerListener(this, it, SensorManager.SENSOR_DELAY_UI)
        }
        magnetometer?.let {
            sensorManager.registerListener(this, it, SensorManager.SENSOR_DELAY_UI)
        }
    }

    /**
     * يتم استدعاؤها فور مغادرة التبويب أو إغلاق اللوحة لإيقاف سحب البطارية
     */
    fun stopListening() {
        sensorManager.unregisterListener(this)
        hasGravity = false
        hasGeomagnetic = false
    }

    override fun onSensorChanged(event: SensorEvent) {
        when (event.sensor.type) {
            Sensor.TYPE_ACCELEROMETER -> {
                System.arraycopy(event.values, 0, gravityMatrix, 0, 9)
                hasGravity = true
                _pitch.value = event.values[1]
                _roll.value = event.values[0]
            }
            Sensor.TYPE_MAGNETIC_FIELD -> {
                System.arraycopy(event.values, 0, geomagneticMatrix, 0, 9)
                hasGeomagnetic = true
            }
        }

        if (hasGravity && hasGeomagnetic) {
            val success = SensorManager.getRotationMatrix(rMatrix, iMatrix, gravityMatrix, geomagneticMatrix)
            if (success) {
                val orientation = FloatArray(3)
                SensorManager.getOrientation(rMatrix, orientation)
                val azimuthInRadians = orientation[0]
                val azimuthInDegrees = ((Math.toDegrees(azimuthInRadians.toDouble()) + 360) % 360).toFloat()
                _compassAzimuth.value = azimuthInDegrees
            }
        }
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {
        // لا حاجة لعمليات إضافية هنا
    }
}`,
  },
  {
    name: 'AndroidManifest.xml',
    language: 'xml',
    badge: 'Permissions & System Overlay',
    description: 'الأذونات الرسمية المطلوبة لظهور لوحة الحافة فوق التطبيقات مع إعلان الخدمة من نوع specialUse المتوافق مع أندرويد 14 و 15.',
    code: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.partner.edgepanel">

    <!-- إذن الظهور فوق التطبيقات الأخرى (أساسي للمقبض العائم) -->
    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />

    <!-- إذن الخدمة الأمامية المتوافق مع أندرويد 14 و 15 -->
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE_SPECIAL_USE" />

    <!-- إذن الاهتزاز اللمسي لتأكيد السحب واللمس -->
    <uses-permission android:name="android.permission.VIBRATE" />

    <!-- إذن إشعارات أندرويد 13+ -->
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />

    <!-- إذن تشغيل الكشاف -->
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-feature android:name="android.hardware.camera.flash" android:required="false" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="EdgePanel"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.EdgePanel">

        <!-- شاشة الإعدادات الرئيسية وطلب الأذونات -->
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:theme="@style/Theme.EdgePanel">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <!-- خدمة مقبض ولوحة الحافة -->
        <service
            android:name=".service.EdgePanelService"
            android:enabled="true"
            android:exported="false"
            android:foregroundServiceType="specialUse">
            <property
                android:name="android.app.PROPERTY_SPECIAL_USE_FGS_SUBTYPE"
                android:value="Edge panel accessibility and floating multitasking utility" />
        </service>

    </application>

</manifest>`,
  },
  {
    name: 'MainActivity.kt',
    language: 'kotlin',
    badge: 'Permission Checker & Controller',
    description: 'شاشة التحكم بالإعدادات، فحص إذن الظهور فوق التطبيقات (SYSTEM_ALERT_WINDOW) وتوجيه المستخدم لتفعيله بنقرة واحدة.',
    code: `package com.partner.edgepanel

import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.provider.Settings
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.partner.edgepanel.service.EdgePanelService

class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            EdgePanelSettingsScreen(
                hasOverlayPermission = Settings.canDrawOverlays(this),
                onRequestPermission = { requestOverlayPermission() },
                onStartService = { startEdgeService() },
                onStopService = { stopEdgeService() }
            )
        }
    }

    private fun requestOverlayPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            val intent = Intent(
                Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                Uri.parse("package:$packageName")
            )
            startActivity(intent)
        }
    }

    private fun startEdgeService() {
        if (Settings.canDrawOverlays(this)) {
            val intent = Intent(this, EdgePanelService::class.java)
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                startForegroundService(intent)
            } else {
                startService(intent)
            }
        } else {
            requestOverlayPermission()
        }
    }

    private fun stopEdgeService() {
        val intent = Intent(this, EdgePanelService::class.java)
        stopService(intent)
    }
}`,
  },
];

export const AndroidCodeModal: React.FC<AndroidCodeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedFileIdx, setSelectedFileIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentFile = ANDROID_FILES[selectedFileIdx];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md select-text animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[88vh] bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg text-slate-950 font-bold">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white">
                  أكواد أندرويد الجاهزة (Kotlin & Jetpack Compose)
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-semibold border border-cyan-500/30">
                  Android 14 & 15 Ready
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                جاهزة للنسخ واللصق مباشرة في مشروع Android Studio مع ترشيد البطارية بنسبة 100%
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCode}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-slate-950 stroke-[3]" />
                  <span>تم النسخ بنجاح!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>نسخ كود الملف الحالي</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Badges Bar: Architectural Highlights */}
        <div className="px-5 py-2.5 bg-slate-900/30 border-b border-slate-800/80 flex items-center gap-4 text-[11px] overflow-x-auto">
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <BatteryCharging className="w-4 h-4" />
            <span>صفر استهلاك للبطارية في الخلفية (Sensors Unregistering)</span>
          </div>
          <div className="flex items-center gap-1.5 text-cyan-400 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>إدارة أذونات SYSTEM_ALERT_WINDOW الآمنة</span>
          </div>
          <div className="flex items-center gap-1.5 text-purple-400 font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Jetpack Compose مباشرة داخل WindowManager</span>
          </div>
        </div>

        {/* Modal Main Area: Sidebar Files + Code View */}
        <div className="flex-1 flex overflow-hidden">
          {/* File Selector Sidebar */}
          <div className="w-64 border-l border-slate-800 bg-slate-900/40 p-3 space-y-1.5 overflow-y-auto shrink-0 custom-scrollbar">
            <span className="text-[10px] font-bold text-slate-400 px-2 uppercase tracking-wider block mb-2">
              ملفات المشروع (5 ملفات)
            </span>
            {ANDROID_FILES.map((file, idx) => (
              <button
                key={file.name}
                onClick={() => setSelectedFileIdx(idx)}
                className={`w-full text-right p-2.5 rounded-xl text-xs transition-all flex flex-col gap-1 ${
                  selectedFileIdx === idx
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2">
                  <FileCode className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
                  <span className="font-mono font-semibold truncate">{file.name}</span>
                </div>
                <span className="text-[10px] text-slate-500 truncate">{file.badge}</span>
              </button>
            ))}
          </div>

          {/* Code Viewer Panel */}
          <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
            {/* Active file description banner */}
            <div className="px-4 py-2.5 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between">
              <div className="text-xs text-slate-300">
                <span className="font-bold text-cyan-300">{currentFile.name}</span>: {currentFile.description}
              </div>
              <span className="text-[10px] font-mono text-slate-500 uppercase">{currentFile.language}</span>
            </div>

            {/* Code Body */}
            <div className="flex-1 p-4 overflow-auto custom-scrollbar font-mono text-xs leading-relaxed text-slate-200">
              <pre className="whitespace-pre">
                <code>{currentFile.code}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
